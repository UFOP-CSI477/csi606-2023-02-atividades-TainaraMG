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
import { iPessoaModel } from "@/models";
import { TipoSanguineoBadge } from "./tipo-sanguineo-badge";
import { Label } from "./label";

interface HeroSelectProps {
  value: string | undefined;
  onValueChange: (value: string) => any;
  hasError?: boolean;
}

export const HeroSelect = ({
  onValueChange,
  value,
  hasError,
}: HeroSelectProps) => {
  const { ref, inView } = useInView();
  const { data, isReachingEnd, error, paginate } =
    useFetchInfinite<iPessoaModel>("pessoas");

  React.useEffect(() => {
    if (inView) paginate();
  }, [inView]);

  if (!data) {
    return (
      <div>
        <Label>Select a hero</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select a hero" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Heroes</SelectLabel>
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
      <Label>Select a hero</Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select a hero" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Heroes</SelectLabel>
            {data &&
              data.map((item, index) => (
                <SelectItem
                  key={`select-pessoas-${index}`}
                  value={item.id.toString()}
                >
                  {item.nome}
                  <TipoSanguineoBadge
                  type={item.tipoSanguineo.tipo}
                    factor={item.tipoSanguineo.fator}
                    hasBorder={false}
                  />
                </SelectItem>
              ))}
            {!isReachingEnd && (
              <SelectLabel className="grid place-content-center">
                <Loader ref={ref} />
              </SelectLabel>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
      {hasError && <Label className="text-red-500">The hero is required</Label>}
    </div>
  );
};
