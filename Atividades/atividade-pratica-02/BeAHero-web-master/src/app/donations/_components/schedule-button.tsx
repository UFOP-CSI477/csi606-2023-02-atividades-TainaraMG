"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { PlusIcon } from "@radix-ui/react-icons";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { HeroSelect } from "@/components/ui/hero-select";
import { DonationCenterSelect } from "@/components/ui/donation-center-select";
import { DatePicker } from "@/components/ui/date-picker";
import { postDoacao } from "@/services/doacao-api";
import { useSWRConfig } from "swr/_internal";
import { IDoacaoModel } from "@/models";
import { toast } from "sonner";

export function ScheduleButton() {
  const [open, setOpen] = React.useState(false);
  const { isLg } = useBreakpoint("lg");

  const handlePost = () => {
    setOpen(false);
  };

  if (isLg) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="max-w-fit mt-2 sm:mt-0">
            <PlusIcon className="mr-2 h-4 w-4" /> Save a day
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Save a day</DialogTitle>
            <DialogDescription>
              Provide the required information about the hero and the donation
            </DialogDescription>
          </DialogHeader>
          <DonationForm onPost={handlePost} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="max-w-fit mt-2 sm:mt-0">
          <PlusIcon className="mr-2 h-4 w-4" /> Save a day
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Save a day</DrawerTitle>
          <DrawerDescription>
            Provide the required information about the hero and the donation
          </DrawerDescription>
        </DrawerHeader>
        <DonationForm className="px-4" onPost={handlePost} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

interface FormValues {
  hero: string;
  donationCenter: string;
  date: Date;
}

interface DonationFormProps extends React.ComponentProps<"form"> {
  onPost: () => any;
  donation?: IDoacaoModel;
}

export function DonationForm({
  className,
  onPost,
  donation,
}: DonationFormProps) {
  const { mutate } = useSWRConfig();
  const schema = yup.object().shape({
    hero: yup
      .string()
      .notOneOf(["undefined"], "The hero is required")
      .required(),
    donationCenter: yup
      .string()
      .notOneOf(["undefined"], "The donation center is required")
      .required(),
    date: yup.date().required("The date is required"),
  });

  const form = useForm<FormValues>({
    defaultValues: {
      hero: donation?.pessoa.id.toString(),
      donationCenter: donation?.local.id.toString(),
      date: donation?.data,
    },
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const { handleSubmit, control } = form;

  const onSubmit = async (data: FormValues) => {
    const _postDoacao = async () => {
      return postDoacao({
        pessoa_id: parseInt(data.hero),
        local_id: parseInt(data.donationCenter),
        data: data.date,
      }).catch((error) => {
        throw error;
      });
    };

    toast.promise(_postDoacao(), {
      loading: "Creating Bat Cave...",
      success: async (_) => {
        await mutate("$inf$http://localhost:8080/api/v1/doacoes?page=0"); // ? Revalidates the first page
        onPost();
        return "We will save someone!";
      },
      error: "Error creating donation :(",
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("grid items-start gap-4 my-4", className)}
    >
      <Controller
        control={control}
        name="hero"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <HeroSelect
            value={value}
            onValueChange={onChange}
            hasError={!!error}
          />
        )}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Controller
          control={control}
          name="donationCenter"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <DonationCenterSelect
              value={value}
              onValueChange={onChange}
              hasError={!!error}
            />
          )}
        />
        <Controller
          control={control}
          name="date"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <DatePicker
              date={value}
              onSelectDate={(day) => onChange(day)}
              hasError={!!error}
            />
          )}
        />
      </div>
      <Button type="submit">Let's donate!</Button>
    </form>
  );
}
