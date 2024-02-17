import react, { useEffect } from "react";

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
import { ICidadeModel } from "@/models";
import { Label } from "./label";
import { StateBadge } from "./state-badge";

interface CitySelectProps {
  value: string | undefined;
  onValueChange: (value: string) => any;
  hasError?: boolean;
  state_id?: string;
}

export const CitySelect = ({
  onValueChange,
  value,
  hasError,
  state_id,
}: CitySelectProps) => {
  const { ref, inView } = useInView();
  const { data, isReachingEnd, error, paginate } =
    useFetchInfinite<ICidadeModel>(`cidades/${state_id ?? 0}`);

  useEffect(() => {
    if (inView) paginate();
  }, [inView]);

  if (!data || error) {
    return (
      <div>
        <Label>Select a city</Label>
        <Select disabled={!state_id}>
          <SelectTrigger>
            <SelectValue placeholder="Select a city" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Cities</SelectLabel>
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
      <Label>Select a city</Label>
      <Select value={value} onValueChange={onValueChange} disabled={!state_id}>
        <SelectTrigger>
          <SelectValue placeholder="Select a city" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Cities</SelectLabel>
            {data &&
              data.map((item, index) => (
                <SelectItem
                  key={`select-cities-${index}`}
                  value={item.id.toString()}
                >
                  {item.nome}
                  <StateBadge state={item.estado.sigla} />
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
      {hasError && <Label className="text-red-500">The city is required</Label>}
    </div>
  );
};
