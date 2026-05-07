import * as React from 'react'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'
import { Slot } from 'radix-ui'

import { cn } from '../lib/utils'

const typographyVariants = cva('', {
  variants: {
    variant: {
      h1: 'cn-font-heading scroll-m-20 text-3xl font-semibold tracking-tight lg:text-4xl',
      h2: 'cn-font-heading scroll-m-20 text-2xl font-semibold tracking-tight',
      h3: 'cn-font-heading scroll-m-20 text-xl font-semibold tracking-tight',
      lead: 'text-base text-muted-foreground',
      body: 'text-sm leading-6',
      muted: 'text-sm text-muted-foreground',
      small: 'text-xs font-medium leading-none',
    },
  },
  defaultVariants: {
    variant: 'body',
  },
})

type TypographyTag = 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div'

type TypographyProps = React.ComponentProps<'p'>
  & VariantProps<typeof typographyVariants>
  & {
    as?: TypographyTag
    asChild?: boolean
  }

function Typography({
  className,
  variant = 'body',
  as = 'p',
  asChild = false,
  ...props
}: TypographyProps) {
  const Comp = asChild ? Slot.Root : as

  return (
    <Comp
      data-slot="typography"
      data-variant={variant}
      className={cn(typographyVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Typography, typographyVariants }
