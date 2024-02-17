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
import { IEstadoModel } from "@/models";
import { Label } from "./label";
import { StateBadge } from "./state-badge";
import { useFetch } from "@/hooks/useFetch";

interface StateSelectProps {
  value: string | undefined;
  onValueChange: (value: string) => any;
  hasError?: boolean;
}

export const StateSelect = ({
  onValueChange,
  value,
  hasError,
}: StateSelectProps) => {
  const { data, error } = useFetch<IEstadoModel>("estados");

  if (!data || error) {
    return (
      <div>
        <Label>Select a state</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select a state" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>States</SelectLabel>
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
      <Label>Select a state</Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select a state" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>States</SelectLabel>
            {data &&
              data.map((item, index) => (
                <SelectItem
                  key={`select-states-${index}`}
                  value={item.id.toString()}
                >
                  {item.nome}
                  <StateBadge state={item.sigla} />
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {hasError && (
        <Label className="text-red-500">The state is required</Label>
      )}
    </div>
  );
};
