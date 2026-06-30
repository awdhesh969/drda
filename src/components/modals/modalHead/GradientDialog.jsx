import React from "react"
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils" // Shadcn's default class merger utility

export function GradientDialog({
  title,
  description,
  icon: Icon,
  children,
  className,
  headerClassName,
  bodyClassName,
  ...props
}) {
  return (
    <DialogContent
      // Combines layout corrections and forces the Radix close icon to be visible against dark hues
      className={cn(
        "p-0 gap-0 overflow-hidden",
        "[&>button]:text-white",
        className
      )}
      {...props}
    >
      {/* Shared Header Structure */}
      <DialogHeader 
        className={cn(
          "relative shrink-0 overflow-hidden bg-linear-to-br from-[#1a2e7a] to-[#3b52ab] px-10 py-8 text-white",
          headerClassName
        )}
      >
        <DialogTitle className="text-xl font-bold tracking-tight">{title}</DialogTitle>
        {description && (
          <DialogDescription className="text-slate-200/90 text-sm mt-1.5">
            {description}
          </DialogDescription>
        )}
      </DialogHeader>

      {/* Shared Form Content Body */}
      <div className={cn("lg:p-8 p-4 space-y-4", bodyClassName)}>
        {children}
      </div>
    </DialogContent>
  )
}