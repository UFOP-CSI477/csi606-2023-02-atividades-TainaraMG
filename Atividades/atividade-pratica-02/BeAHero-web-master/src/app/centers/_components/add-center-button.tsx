"use client";
import react, { useState } from "react";

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
import { useSWRConfig } from "swr/_internal";
import { ILocalColetaModel, iPessoaModel } from "@/models";
import { toast } from "sonner";
import { postPessoa } from "@/services/pessoa-api";
import { GlobalInput } from "@/components/ui/global-input/global-input";
import { StateSelect } from "@/components/ui/state-select";
import { CitySelect } from "@/components/ui/city-select";
import { BloodTypeSelect } from "@/components/ui/blood-type-select";
import { useMaskito } from "@maskito/react";
import { cpfMask } from "@/components/ui/global-input";
import { cpf } from "cpf-cnpj-validator";
import { postlocalColeta } from "@/services/local-coleta-api";

export function AddCenterButton() {
  const [open, setOpen] = useState(false);
  const { isLg } = useBreakpoint("lg");

  const handlePost = () => {
    setOpen(false);
  };

  if (isLg) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="max-w-fit mt-2 sm:mt-0">
            <PlusIcon className="mr-2 h-4 w-4" /> Add a new Bat Cave
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add a new Bat Cave</DialogTitle>
            <DialogDescription>
              Provide the required information about the donation center
            </DialogDescription>
          </DialogHeader>
          <CenterForm onPost={handlePost} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="max-w-fit mt-2 sm:mt-0">
          <PlusIcon className="mr-2 h-4 w-4" /> Add a new Bat Cave
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Add a new Bat Cave</DrawerTitle>
          <DrawerDescription>
            Provide the required information about the donation center
          </DrawerDescription>
        </DrawerHeader>
        <CenterForm className="px-4" onPost={handlePost} />
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
  center: string;
  street: string;
  addressComplement: string;
  addressNumber: string;
  city: string;
}

interface CenterFormProps extends React.ComponentProps<"form"> {
  onPost: () => any;
  center?: ILocalColetaModel;
}

export function CenterForm({ className, onPost, center }: CenterFormProps) {
  const { mutate } = useSWRConfig();
  const [state, setState] = useState<string | undefined>(undefined);
  const inputRef = useMaskito({ options: cpfMask });

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
    const _postLocalColeta = async () => {
      return postlocalColeta({
        body: {
          cidade_id: parseInt(data.city),
          complemento: data.addressComplement,
          nome: data.center,
          numero: data.addressNumber,
          rua: data.street,
        },
      }).catch((error) => {
        throw error;
      });
    };

    toast.promise(_postLocalColeta(), {
      loading: "Creating Bat Cave...",
      success: async (_) => {
        await mutate("$inf$http://localhost:8080/api/v1/locais-coleta?page=0"); // ? Revalidates the first page
        onPost();
        return `Call the heroes!`;
      },
      error: "Error creating the Bat Cave :(",
    });
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
