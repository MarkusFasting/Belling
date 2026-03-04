import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

export const TooltipProvider = TooltipPrimitive.Provider;

export const Tooltip = TooltipPrimitive.Root;

export const TooltipTrigger = TooltipPrimitive.Trigger;

export const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>((props, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={4}
    className="z-50 rounded-md bg-black text-white px-3 py-1.5 text-sm"
    {...props}
  />
));

TooltipContent.displayName = "TooltipContent";
