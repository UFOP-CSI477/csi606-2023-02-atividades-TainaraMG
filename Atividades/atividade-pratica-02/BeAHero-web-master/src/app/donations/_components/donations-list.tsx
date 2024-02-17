"use client";
import { useFetchInfinite } from "@/hooks/useFetchInfinite";
import React, { useCallback, useEffect } from "react";
import { DonationCard } from ".";
import { useInView } from "react-intersection-observer";
import { Loader } from "@/components/ui/loader";
import { IDoacaoModel, IDoacaoRequestModel } from "@/models";
import { deleteDoacao, updateDoacao } from "@/services/doacao-api";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { FaBug } from "react-icons/fa6";
import { TypographyH1 } from "@/components/ui/typography/typography-h1";
import { TypographyH4 } from "@/components/ui/typography/typography-h4";

export function DonationsList() {
  const { data, error, paginate, isReachingEnd, isLoading, mutate, isEmpty } =
    useFetchInfinite<IDoacaoModel>("doacoes");

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
    (deletedItem: IDoacaoModel) => {
      deleteDoacao(deletedItem.id).catch((error) => {
        toast.error("Error deleting donation :(");
      });
      const updatedData = data
        ? data?.filter((item) => item.id !== deletedItem.id)
        : data;

      mutate([updatedData!], false);

      toast.warning("Donation deleted.");
    },
    [data, mutate]
  );

  const handleUpdate = useCallback(
    async (id: number, updatedItem: IDoacaoRequestModel) => {
      const _updateDoacao = async () => {
        return updateDoacao(id, { body: updatedItem }).catch((error) => {
          throw error;
        });
      };

      toast.promise(_updateDoacao(), {
        loading: "Updating donation...",
        success: async (_) => {
          await mutate(); // ? Revalidates
          return `Donation updated!`;
        },
        error: "Error updating donation :(",
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
        <TypographyH1>Call the Justice League</TypographyH1>
        <TypographyH4>We need to save the day!</TypographyH4>
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
        {data.map((doacao, index) => (
          <>
            <DonationCard
              key={`doacao-card-${index}`}
              donation={doacao}
              onDelete={(donation) => handleDelete(donation)}
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
