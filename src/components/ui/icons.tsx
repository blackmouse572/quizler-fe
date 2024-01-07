import {
  IconAffiliate,
  IconArrowDownRight,
  IconArrowRoundaboutLeft,
  IconArrowUpLeft,
  IconBook,
  IconBrandGithub,
  IconCards,
  IconChalkboard,
  IconCircleOff,
  IconLoader2,
  IconLogout2,
  IconMail,
  IconMaximize,
  IconMenu,
  IconPlayerPause,
  IconPlayerPlay,
  IconSearch,
  IconSmartHome,
  IconX,
  TablerIconsProps,
} from "@tabler/icons-react"

import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons"

export const Icons = {
  Play: IconPlayerPlay,
  Menu: IconMenu,
  Pause: IconPlayerPause,
  FullScreen: IconMaximize,
  Email: IconMail,
  X: IconX,
  Loader: IconLoader2,
  Spinner: IconLoader2,
  Icon: IconCards,
  Home: IconSmartHome,
  About: IconArrowRoundaboutLeft,
  Document: IconBook,
  School: IconChalkboard,
  Contact: IconAffiliate,
  Github: IconBrandGithub,
  SignatureArrow: IconArrowUpLeft,
  Logout: IconLogout2,
  ArrowDownRight: IconArrowDownRight,
  CircleOff: IconCircleOff,
  Search: IconSearch,
  ArrowUp: ChevronUpIcon,
  ArrowDown: ChevronDownIcon,
}

type IIconKeys = keyof typeof Icons

export type { IIconKeys, TablerIconsProps }
