import { IIconKeys } from "@/components/ui/icons"

// If use href, children is not allowed and vice versa
export type MenuItem =
  | {
      label: string
      icon?: IIconKeys
      shortcut?: string
      href: string
      children?: never
    }
  | {
      label: string
      icon?: IIconKeys
      shortcut?: string
      href?: never
      children: MenuItem[]
    }
