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
import {
  ILocalColetaModel,
  ILocalColetaRequestModel,
} from "@/models";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { cn } from "@/lib/utils";
import { GlobalInput } from "@/components/ui/global-input";
import { CitySelect } from "@/components/ui/city-select";
import { StateSelect } from "@/components/ui/state-select";

interface EditCenterDialogProps {
  open: boolean;
  setOpen: (open: boolean) => any;
  center: ILocalColetaModel;
  onUpdate: (id: number, data: ILocalColetaRequestModel) => any;
}

export const EditCenterDialog = ({
  open,
  setOpen,
  center,
  onUpdate,
}: EditCenterDialogProps) => {
  const { isLg } = useBreakpoint("lg");

  const handleEdit = (data: FormValues) => {
    const body: ILocalColetaRequestModel = {
      cidade_id: parseInt(data.city),
      complemento: data.addressComplement,
      nome: data.center,
      numero: data.addressNumber,
      rua: data.street,
    };
    onUpdate(center.id, body);
    setOpen(false);
  };

  if (isLg) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit the Bat Cave</DialogTitle>
            <DialogDescription>
              It looks like the Bat Cave has undergone some construction work.
              Let's check it out!
            </DialogDescription>
          </DialogHeader>
          <CenterForm center={center} onEdit={handleEdit} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit the Bat Cave</DrawerTitle>
          <DrawerDescription>
            It looks like the Bat Cave has undergone some construction work.
            Let's check it out!
          </DrawerDescription>
        </DrawerHeader>
        <CenterForm className="px-4" onEdit={handleEdit} />
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
  center: string;
  street: string;
  addressComplement: string;
  addressNumber: string;
  city: string;
}

interface CenterFormProps extends React.ComponentProps<"form"> {
  onEdit: (data: FormValues) => any;
  center?: ILocalColetaModel;
}

export function CenterForm({ className, onEdit, center }: CenterFormProps) {
  const [state, setState] = useState<string | undefined>(undefined);

  const schema = yup.object().shape({
    city: yup
      .string()
      .notOneOf(["undefined"], "The city is required")
      .required(),
    center: yup.string().required("The Center name is required"),
    street: yup.string().required("The street is required"),
    addressComplement: yup.string().required("The complement is required"),
    addressNumber: yup.string().required("The address number is required"),
  });

  const form = useForm<FormValues>({
    defaultValues: {
      center: center?.nome,
      street: center?.rua,
      addressComplement: center?.complemento,
      addressNumber: center?.numero,
      city: center?.cidade.id.toString(),
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
        name="center"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <GlobalInput
            label="Center name"
            value={value}
            onChange={onChange}
            error={error?.message}
          />
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Controller
          control={control}
          name="street"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <GlobalInput
              label="Street"
              value={value}
              onChange={onChange}
              error={error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="addressNumber"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <GlobalInput
              label="Number"
              value={value}
              onChange={onChange}
              error={error?.message}
            />
          )}
        />
      </div>
      <Controller
        control={control}
        name="addressComplement"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <GlobalInput
            label="Complement"
            value={value}
            onChange={onChange}
            error={error?.message}
          />
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <StateSelect value={state} onValueChange={setState} />
        <Controller
          control={control}
          name="city"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <CitySelect
              value={value}
              onValueChange={onChange}
              hasError={!!error}
              state_id={state}
            />
          )}
        />
      </div>
      <Button type="submit">Call all the heroes!</Button>
    </form>
  );
}
