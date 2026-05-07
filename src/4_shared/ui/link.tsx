import * as React from 'react'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'
import { createLink } from '@tanstack/react-router'
import { cn } from '../lib/utils'

const linkVariants = cva(
  'inline-flex items-center gap-1 rounded-sm underline-offset-4 transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 underline hover:opacity-70 transition-opacity',
  {
    variants: {
      variant: {
        inherit: 'text-inherit font-inherit',
        default: 'text-sm font-medium text-primary',
        muted: 'text-sm font-medium text-muted-foreground',
        destructive: 'text-sm font-medium text-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

type BasicLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>
  & VariantProps<typeof linkVariants>
  & {
    ref?: React.Ref<HTMLAnchorElement>
  }

function BasicLinkComponent({ className, variant, ref, ...props }: BasicLinkProps) {
  return (
    <a
      ref={ref}
      data-slot="link"
      className={cn(linkVariants({ variant }), className)}
      {...props}
    />
  )
}

export const Link = createLink(BasicLinkComponent)

export { linkVariants }
