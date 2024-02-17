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
import { ILocalColetaModel, iPessoaModel } from "@/models";
import { TipoSanguineoBadge } from "./tipo-sanguineo-badge";
import { Label } from "./label";
import { StateBadge } from "./state-badge";

interface DonationCenterSelectProps {
  value: string | undefined;
  onValueChange: (value: string) => any;
  hasError?: boolean;
}

export const DonationCenterSelect = ({
  onValueChange,
  value,
  hasError,
}: DonationCenterSelectProps) => {
  const { ref, inView } = useInView();
  const { data, isReachingEnd, error, paginate } =
    useFetchInfinite<ILocalColetaModel>("locais-coleta");

  React.useEffect(() => {
    if (inView) paginate();
  }, [inView]);

  if (!data) {
    return (
      <div>
        <Label>Select a donation center</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select a donation center" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Centers</SelectLabel>
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
      <Label>Select a donation center</Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select a donation center" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Centers</SelectLabel>
            {data &&
              data.map((item, index) => (
                <SelectItem
                  key={`select-pessoas-${index}`}
                  value={item.id.toString()}
                >
                  {item.nome}
                  <StateBadge state={item.cidade.estado.sigla} />
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
      {hasError && <Label className="text-red-500">The location center is required</Label>}
    </div>
  );
};
