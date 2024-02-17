import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader } from "./loader";
import { useInView } from "react-intersection-observer";
import { useFetchInfinite } from "@/hooks/useFetchInfinite";
import { IEstadoModel, ITipoSanguineoModel } from "@/models";
import { Label } from "./label";
import { StateBadge } from "./state-badge";
import { useFetch } from "@/hooks/useFetch";
import { TipoSanguineoBadge } from "./tipo-sanguineo-badge";

interface BloodTypeSelectProps {
  value: string | undefined;
  onValueChange: (value: string) => any;
  hasError?: boolean;
}

export const BloodTypeSelect = ({
  onValueChange,
  value,
  hasError,
}: BloodTypeSelectProps) => {
  const { data, error } = useFetch<ITipoSanguineoModel>("tipos-sanguineos");

  if (!data || error) {
    return (
      <div>
        <Label>Select the hero blood type</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select a blood type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Types</SelectLabel>
              <SelectLabel className="grid place-content-center">
                <Loader />
              </SelectLabel>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    );
  }

  return (
    <div>
      <Label>Select the hero blood type</Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select a blood type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Types</SelectLabel>
            {data &&
              data.map((item, index) => (
                <SelectItem
                  key={`select-states-${index}`}
                  value={item.id.toString()}
                >
                  <TipoSanguineoBadge hasBorder={false} factor={item.fator} type={item.tipo}/>
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {hasError && (
        <Label className="text-red-500">The blood type is required</Label>
      )}
    </div>
  );
};
