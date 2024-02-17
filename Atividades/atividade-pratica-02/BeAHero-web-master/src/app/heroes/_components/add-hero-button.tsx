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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { IDoacaoModel, IEstadoModel, iPessoaModel } from "@/models";
import { toast } from "sonner";
import { postPessoa } from "@/services/pessoa-api";
import { GlobalInput } from "@/components/ui/global-input/global-input";
import { StateSelect } from "@/components/ui/state-select";
import { CitySelect } from "@/components/ui/city-select";
import { BloodTypeSelect } from "@/components/ui/blood-type-select";
import { useMaskito } from "@maskito/react";
import { cpfMask } from "@/components/ui/global-input";
import { cpf } from "cpf-cnpj-validator";

export function AddHeroButton() {
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
            <PlusIcon className="mr-2 h-4 w-4" /> Recruit a hero
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Recruit a hero</DialogTitle>
            <DialogDescription>
              Provide the required information about the hero
            </DialogDescription>
          </DialogHeader>
          <HeroForm onPost={handlePost} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="max-w-fit mt-2 sm:mt-0">
          <PlusIcon className="mr-2 h-4 w-4" /> Recruit a hero
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Recruit a hero</DrawerTitle>
          <DrawerDescription>
            Provide the required information about the hero
          </DrawerDescription>
        </DrawerHeader>
        <HeroForm className="px-4" onPost={handlePost} />
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
  street: string;
  addressComplement: string;
  addressNumber: string;
  rg: string;
  blood: string;
  city: string;
}

interface HeroFormProps extends React.ComponentProps<"form"> {
  onPost: () => any;
  hero?: iPessoaModel;
}

export function HeroForm({ className, onPost, hero }: HeroFormProps) {
  const { mutate } = useSWRConfig();
  const [state, setState] = useState<string | undefined>(undefined);
  const inputRef = useMaskito({ options: cpfMask });

  const schema = yup.object().shape({
    blood: yup
      .string()
      .notOneOf(["undefined"], "The blood type is required")
      .required(),
    city: yup
      .string()
      .notOneOf(["undefined"], "The city is required")
      .required(),
    hero: yup.string().required("The hero is required"),
    street: yup.string().required("The street is required"),
    addressComplement: yup.string().required("The complement is required"),
    addressNumber: yup.string().required("The address number is required"),
    rg: yup
      .string()
      .required("The CPF is required")
      .test("test_cpf", "The CPF is invalid", (data) => cpf.isValid(data)),
  });

  const form = useForm<FormValues>({
    defaultValues: {
      hero: hero?.nome,
      street: hero?.rua,
      addressComplement: hero?.complemento,
      addressNumber: hero?.numero,
      rg: hero?.rg,
      blood: hero?.tipoSanguineo.id.toString(),
      city: hero?.cidade.id.toString(),
    },
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const { handleSubmit, control } = form;

  const onSubmit = async (data: FormValues) => {
    const _postPessoa = async () => {
      return postPessoa({
        body: {
          cidade_id: parseInt(data.city),
          complemento: data.addressComplement,
          nome: data.hero,
          numero: data.addressNumber,
          rg: cpf.format(data.rg),
          rua: data.street,
          tipo_id: parseInt(data.blood),
        },
      }).catch((error) => {
        throw error;
      });
    };

    toast.promise(_postPessoa(), {
      loading: "Recruiting hero...",
      success: async (_) => {
        await mutate("$inf$http://localhost:8080/api/v1/pessoas?page=0"); // ? Revalidates the first page
        onPost();
        return `Welcome hero!`;
      },
      error: "Error recruiting hero :(",
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
          <GlobalInput
            label="Hero"
            value={value}
            onChange={onChange}
            error={error?.message}
          />
        )}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Controller
          control={control}
          name="rg"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <GlobalInput
              ref={inputRef}
              label="CPF"
              value={value}
              onInput={(e) => {
                onChange(e.currentTarget.value);
              }}
              error={error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="blood"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <BloodTypeSelect
              value={value}
              onValueChange={onChange}
              hasError={!!error}
            />
          )}
        />
      </div>

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
      <Button type="submit">Recruit hero!</Button>
    </form>
  );
}
