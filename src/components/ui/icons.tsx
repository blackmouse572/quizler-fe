import {
  IconAffiliate,
  IconArrowDownRight,
  IconArrowRoundaboutLeft,
  IconArrowUpLeft,
  IconBrandGithub,
  IconCards,
  IconChalkboard,
  IconLoader2,
  IconLogout2,
  IconMail,
  IconMaximize,
  IconMenu,
  IconPlayerPause,
  IconPlayerPlay,
  IconSmartHome,
  IconX,
  TablerIconsProps,
} from "@tabler/icons-react"

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
  School: IconChalkboard,
  Contact: IconAffiliate,
  Github: IconBrandGithub,
  SignatureArrow: IconArrowUpLeft,
  Logout: IconLogout2,
  ArrowDownRight: IconArrowDownRight,
}

type IIconKeys = keyof typeof Icons

export type { IIconKeys, TablerIconsProps }
