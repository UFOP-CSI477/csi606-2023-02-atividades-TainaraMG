import react, { useState } from "react";
import { DialogHeader } from "@/components/ui/dialog";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";


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
import { IPessoaRequestModel, iPessoaModel } from "@/models";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { HeroSelect } from "@/components/ui/hero-select";
import { DonationCenterSelect } from "@/components/ui/donation-center-select";
import { cn } from "@/lib/utils";
import { useMaskito } from "@maskito/react";
import { GlobalInput, cpfMask } from "@/components/ui/global-input";
import { cpf } from "cpf-cnpj-validator";
import { StateSelect } from "@/components/ui/state-select";
import { BloodTypeSelect } from "@/components/ui/blood-type-select";
import { CitySelect } from "@/components/ui/city-select";

interface EditHeroDialogProps {
  open: boolean;
  setOpen: (open: boolean) => any;
  hero: iPessoaModel;
  onUpdate: (id: number, data: IPessoaRequestModel) => any;
}

export const EditHeroDialog = ({
  open,
  setOpen,
  hero,
  onUpdate,
}: EditHeroDialogProps) => {
  const { isLg } = useBreakpoint("lg");

  const handleEdit = (data: FormValues) => {
    const body: IPessoaRequestModel = {
      nome: data.hero,
      complemento: data.addressComplement,
      numero: data.addressNumber,
      rg: data.rg,
      rua: data.street,
      tipo_id: parseInt(data.blood),
      cidade_id: parseInt(data.city),
    };
    onUpdate(hero.id, body);
    setOpen(false);
  };

  if (isLg) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit hero</DialogTitle>
            <DialogDescription>
              The hero just changed powers? Update it!
            </DialogDescription>
          </DialogHeader>
          <HeroForm hero={hero} onEdit={handleEdit} />
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
          The hero just changed powers? Update it!
          </DrawerDescription>
        </DrawerHeader>
        <HeroForm className="px-4" onEdit={handleEdit} />
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
  street: string;
  addressComplement: string;
  addressNumber: string;
  rg: string;
  blood: string;
  city: string;
}

interface HeroFormProps extends React.ComponentProps<"form"> {
  onEdit: (data: FormValues) => any;
  hero?: iPessoaModel;
}

export function HeroForm({ className, onEdit, hero }: HeroFormProps) {
    const [state, setState] = useState<string | undefined>(hero?.cidade.estado.id.toString());
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
  