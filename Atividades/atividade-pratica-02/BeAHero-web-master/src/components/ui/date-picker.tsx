import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover";
import { Button } from "./button";
import moment from "moment";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "./calendar";
import { SelectSingleEventHandler } from "react-day-picker";
import { Label } from "./label";
import { Card } from "./card";

interface DatePickerProps {
  date: Date | undefined;
  onSelectDate: SelectSingleEventHandler;
  hasError?: boolean;
}

export const DatePicker = ({ date, onSelectDate, hasError }: DatePickerProps) => {
  return (
    <div>
      <Label>Select the donation date</Label>
      <Popover>
        <PopoverTrigger asChild>
          <div>
            <Button variant={"outline"} type="button" className="w-full">
              {date ? moment(date).format("MMMM Do, YYYY") : <span>Pick a date</span>}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-popover" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={onSelectDate}
              disabled={(date) =>
                date < new Date() || date < new Date("1900-01-01")
              }
              initialFocus
            />
    
        </PopoverContent>
      </Popover>
      {hasError && <Label className="text-red-500">The date is required</Label>}
    </div>
  );
};
