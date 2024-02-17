"use client";
import { useFetchInfinite } from "@/hooks/useFetchInfinite";
import React, { useCallback, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Loader } from "@/components/ui/loader";
import {
  IDoacaoModel,
  IDoacaoRequestModel,
  IPessoaRequestModel,
  iPessoaModel,
} from "@/models";
import { deleteDoacao, updateDoacao } from "@/services/doacao-api";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { FaBug } from "react-icons/fa6";
import { TypographyH1 } from "@/components/ui/typography/typography-h1";
import { TypographyH4 } from "@/components/ui/typography/typography-h4";
import { HeroCard } from "./hero-card";
import { deletePessoa, updatePessoa } from "@/services/pessoa-api";

export function HeroesList() {
  const { data, error, paginate, isReachingEnd, isLoading, mutate, isEmpty } =
    useFetchInfinite<iPessoaModel>("pessoas");

  const { ref, inView } = useInView();

  const container = {
    initial: {},
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 1,
    },
  };

  const handleDelete = useCallback(
    (deletedItem: iPessoaModel) => {
      deletePessoa(deletedItem.id).catch((error) => {
        toast.error("Error deleting hero. :(");
      });
      const updatedData = data
        ? data?.filter((item) => item.id !== deletedItem.id)
        : data;

      mutate([updatedData!], false);

      toast.warning("Hero deleted.");
    },
    [data, mutate]
  );

  const handleUpdate = useCallback(
    async (id: number, updatedItem: IPessoaRequestModel) => {
      const _updatePessoa = async () => {
        return updatePessoa(id, { body: updatedItem }).catch((error) => {
          throw error;
        });
      };

      toast.promise(_updatePessoa(), {
        loading: "Updating hero...",
        success: async (_) => {
          await mutate(); // ? Revalidates
          return `Hero updated!`;
        },
        error: "Error updating hero :(",
      });
    },
    [data, mutate]
  );

  useEffect(() => {
    if (inView) paginate();
  }, [inView]);

  if (!data) {
    return (
      <div className="h-[calc(100vh_/_2)] grid place-content-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[calc(100vh_/_2)] grid place-content-center">
        <TypographyH1>The Justice League has been attacked</TypographyH1>
        <TypographyH4>We will be right back to save the day :)</TypographyH4>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="h-[calc(100vh_/_2)] grid place-content-center">
        <TypographyH1>The Hall of Justice is empty...</TypographyH1>
        <TypographyH4>We should recruit some heroes</TypographyH4>
      </div>
    );
  }

  return (
    <>
      <motion.div
        className="grid gap-4 grid-cols-1  lg:grid-cols-2 xl:grid-cols-3 my-4"
        animate="animate"
        initial="initial"
        exit="exit"
        variants={container}
      >
        {data.map((hero, index) => (
          <>
            <HeroCard
              key={`doacao-card-${index}`}
              hero={hero}
              onDelete={(donation) => handleDelete(hero)}
              onUpdate={(id, updatedDnation) =>
                handleUpdate(id, updatedDnation)
              }
            />
          </>
        ))}
      </motion.div>
      {!isReachingEnd && <Loader ref={ref} />}
      {isLoading && <div>loading...</div>}
    </>
  );
}
