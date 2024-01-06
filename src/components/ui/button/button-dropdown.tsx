"use client";

import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";



import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";



import { ButtonProps } from "./button";


export interface IButtonIconProps extends ButtonProps {}

export const ButtonDropdown = (props: IButtonIconProps) => {
  const [expand, setExpand] = useState<boolean>(false);

  const toggleExpand = () => {
    setExpand(prev => !prev)
  }
  return (
    <Button
      variant="flat"
      size="icon"
      {...props}
      className={cn(props.className)}
      onClick={() => toggleExpand()}
    >
      {expand ? (
        <ChevronDownIcon className="h-4 w-4" />
      ) : (
        <ChevronUpIcon className="h-4 w-4" />
      )}
    </Button>
  )
}