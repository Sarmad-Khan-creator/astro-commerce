import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import React from "react";

interface Props {
  items: {
    title: string;
    value: string;
  }[];
  form: any;
  field: any;
  name: string;
}

const SelectMultiple = ({ items, form, field, name }: Props) => {
  return (
    <>
      <div className="flex items-center gap-2">
        {form.getValues(name).map((item: any) => (
          <div
            className="rounded-lg px-2 py-1 bg-gray-400 flex items-center gap-3"
            key={item}
          >
            <p>{item}</p>
            <X
              className="h-3 w-3 cursor-pointer"
              onClick={() => {
                form.setValue(
                  name,
                  field.value.filter((val: any) => val !== item)
                );
              }}
            />
          </div>
        ))}
      </div>
      <div className="flex w-[300px] justify-between items-center">
        {items.map((item) => (
          <Button
            key={item.value}
            type="button"
            variant={"outline"}
            className="text-xs bg-gray-200"
            onClick={() => form.setValue(name, [item.value, ...field.value])}
            disabled={form.getValues(name).includes(item.value)}
          >
            {item.title}
          </Button>
        ))}
      </div>
    </>
  );
};

export default SelectMultiple;
