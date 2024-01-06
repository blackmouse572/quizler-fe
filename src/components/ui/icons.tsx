import {
  IconArrowUpLeft,
  IconBrandGithub,
  IconCards,
  IconLoader2,
  IconLogout2,
  IconMail,
  IconMaximize,
  IconPlayerPause,
  IconPlayerPlay,
  IconX,
  TablerIconsProps,
} from "@tabler/icons-react"

export const Icons = {
  Play: IconPlayerPlay,
  Pause: IconPlayerPause,
  FullScreen: IconMaximize,
  Email: IconMail,
  X: IconX,
  Loader: IconLoader2,
  Spinner: IconLoader2,
  Icon: IconCards,
  Github: IconBrandGithub,
  SignatureArrow: IconArrowUpLeft,
  Logout: IconLogout2,
}

type IIconKeys = keyof typeof Icons

export type { IIconKeys, TablerIconsProps }
