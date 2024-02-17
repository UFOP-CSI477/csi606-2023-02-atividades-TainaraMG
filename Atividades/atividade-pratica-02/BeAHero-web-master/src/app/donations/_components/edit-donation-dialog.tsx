import { DialogHeader } from "@/components/ui/dialog";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import react, { useState } from "react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { IDoacaoModel, IDoacaoRequestModel } from "@/models";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { HeroSelect } from "@/components/ui/hero-select";
import { DonationCenterSelect } from "@/components/ui/donation-center-select";
import { DatePicker } from "@/components/ui/date-picker";
import { cn } from "@/lib/utils";

interface EditDonationDialogProps {
  open: boolean;
  setOpen: (open: boolean) => any;
  donation: IDoacaoModel;
  onUpdate: (id: number, data: IDoacaoRequestModel) => any;
}

export const EditDonationDialog = ({
  open,
  setOpen,
  donation,
  onUpdate,
}: EditDonationDialogProps) => {
  const { isLg } = useBreakpoint("lg");

  const handleEdit = (data: FormValues) => {
    const body: IDoacaoRequestModel = {
      data: data.date,
      local_id: parseInt(data.donationCenter),
      pessoa_id: parseInt(data.hero),
    };
    onUpdate(donation.id, body);
    setOpen(false);
  };

  if (isLg) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Schedule a hero donation</DialogTitle>
            <DialogDescription>
              Provide the required information about the hero and the donation
            </DialogDescription>
          </DialogHeader>
          <DonationForm donation={donation} onEdit={handleEdit} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Schedule a hero donation</DrawerTitle>
          <DrawerDescription>
          Provide the required information about the hero and the donation
          </DrawerDescription>
        </DrawerHeader>
        <DonationForm className="px-4" onEdit={handleEdit} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

interface FormValues {
  hero: string;
  donationCenter: string;
  date: Date;
}

interface DonationFormProps extends React.ComponentProps<"form"> {
  onEdit: (data: FormValues) => any;
  donation?: IDoacaoModel;
}

export function DonationForm({
  className,
  onEdit,
  donation,
}: DonationFormProps) {
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
    onEdit(data);
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
      <Button type="submit">Edit donation!</Button>
    </form>
  );
}
