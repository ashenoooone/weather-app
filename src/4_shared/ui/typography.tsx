import * as React from 'react'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'
import { Slot } from 'radix-ui'

import { cn } from '../lib/utils'

const typographyVariants = cva('', {
  variants: {
    variant: {
      h1: 'cn-font-heading scroll-m-20 text-2xl leading-8 font-semibold tracking-tight',
      h2: 'cn-font-heading scroll-m-20 text-xl leading-7 font-semibold tracking-tight',
      h3: 'cn-font-heading scroll-m-20 text-lg leading-7 font-semibold tracking-tight',
      lead: 'text-base leading-7 text-muted-foreground',
      body: 'text-sm leading-6',
      muted: 'text-sm leading-5 text-muted-foreground',
      small: 'text-xs leading-5 font-medium text-muted-foreground',
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
