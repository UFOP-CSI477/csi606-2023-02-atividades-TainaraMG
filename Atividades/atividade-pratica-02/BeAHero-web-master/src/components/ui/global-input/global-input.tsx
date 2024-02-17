import { forwardRef } from "react";
import { Input, InputProps } from "../input";
import { Label } from "../label";

interface GlobalInputProps extends InputProps {
  label: string;
  error?: string;
}

export const GlobalInput = forwardRef<
  HTMLInputElement,
  GlobalInputProps
>(({ label, error, onChange, value, ...props }, ref) => {
  return (
    <div>
      <Label>{label}</Label>
      <Input ref={ref} value={value} onChange={onChange} {...props} />
      {error && <Label className="text-red-500">{error}</Label>}
    </div>
  );
});
