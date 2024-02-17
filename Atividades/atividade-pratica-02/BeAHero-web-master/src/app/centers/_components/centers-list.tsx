"use client";
import { useFetchInfinite } from "@/hooks/useFetchInfinite";
import React, { useCallback, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Loader } from "@/components/ui/loader";
import {
  ILocalColetaModel,
  ILocalColetaRequestModel,
  IPessoaRequestModel,
  iPessoaModel,
} from "@/models";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { FaBug } from "react-icons/fa6";
import { TypographyH1 } from "@/components/ui/typography/typography-h1";
import { TypographyH4 } from "@/components/ui/typography/typography-h4";
import { deleteLocalColeta, updateLocalColeta } from "@/services/local-coleta-api";
import { CenterCard } from "./center-card";

export function CentersList() {
  const { data, error, paginate, isReachingEnd, isLoading, mutate, isEmpty } =
    useFetchInfinite<ILocalColetaModel>("locais-coleta");

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
    (deletedItem: ILocalColetaModel) => {
      deleteLocalColeta(deletedItem.id).catch((error) => {
        toast.error("Error deleting Bat Cave. :(");
      });
      const updatedData = data
        ? data?.filter((item) => item.id !== deletedItem.id)
        : data;

      mutate([updatedData!], false);

      toast.warning("Bat Cave deleted.");
    },
    [data, mutate]
  );

  const handleUpdate = useCallback(
    async (id: number, updatedItem: ILocalColetaRequestModel) => {
      const _updateLocalColeta = async () => {
        return updateLocalColeta(id, { body: updatedItem }).catch((error) => {
          throw error;
        });
      };

      toast.promise(_updateLocalColeta(), {
        loading: "Updating Bat Cave...",
        success: async (_) => {
          await mutate(); // ? Revalidates
          return `The updated Bat Cave is amazing!`;
        },
        error: "Error updating Bat Cave :(",
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
        <TypographyH1>The heroes have nowhere to stay...</TypographyH1>
        <TypographyH4>We should built a Bat Cave</TypographyH4>
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
        {data.map((center, index) => (
          <>
            <CenterCard
              key={`doacao-card-${index}`}
              center={center}
              onDelete={(center) => handleDelete(center)}
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
