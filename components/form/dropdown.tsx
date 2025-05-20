"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";

interface DropdownMenuRadioGroupProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}

export function DropdownMenuCustomize({
  options,
  value,
  onChange,
}: DropdownMenuRadioGroupProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
      <DropdownMenuLabel>
        <Button
          variant="outline" 
          className="capitalize">
            {
            options.find((x) => x.value === value)?.label}
            <ChevronDownIcon className="size-4 opacity-50" />
          </Button>
      </DropdownMenuLabel>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuRadioGroup value={value} onValueChange={onChange}>
          {options.map((option) => (
            <DropdownMenuRadioItem 
              key={option.value} 
              value={option.value}
              className="capitalize">
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}