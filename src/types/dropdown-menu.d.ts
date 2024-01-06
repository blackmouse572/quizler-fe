import { IIconKeys } from "@/components/ui/icons"

export type MenuItem = {
  label: string
  icon?: IIconKeys
  shortcut?: string
  href: string
  children?: MenuItem[]
}
