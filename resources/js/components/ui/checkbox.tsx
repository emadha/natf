"use client"

import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import * as React from "react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

function Checkbox({
  className,
  checked,
  defaultChecked,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  // Handle controlled & uncontrolled state for fluid SVG animations
  const [internalChecked, setInternalChecked] = React.useState(
      Boolean(checked ?? defaultChecked)
  )

  React.useEffect(() => {
    if (checked !== undefined) {
      setInternalChecked(Boolean(checked))
    }
  }, [checked])

  return (
      <CheckboxPrimitive.Root
          data-slot="checkbox"
          checked={checked}
          defaultChecked={defaultChecked}
          onCheckedChange={(val) => {
            setInternalChecked(Boolean(val))
            props.onCheckedChange?.(val)
          }}
          className={cn(
              "peer border-input data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-200 ease-out active:scale-85",
              className
          )}
          {...props}
      >
        <CheckboxPrimitive.Indicator
            data-slot="checkbox-indicator"
            className="flex items-center justify-center text-current"
            forceMount
        >
          <svg
              className="size-3.5 stroke-current stroke-[2.75] fill-none"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
          >
            <motion.path
                d="M20 6L9 17l-5-5"
                initial={false}
                animate={{
                  pathLength: internalChecked ? 1 : 0,
                  opacity: internalChecked ? 1 : 0,
                  scale: internalChecked ? 1 : 0.6,
                }}
                transition={{
                  pathLength: {
                    type: "spring",
                    stiffness: 400,
                    damping: 28,
                  },
                  opacity: { duration: 0.12 },
                  scale: {
                    type: "spring",
                    stiffness: 500,
                    damping: 25,
                  },
                }}
            />
          </svg>
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
  )
}

export { Checkbox }