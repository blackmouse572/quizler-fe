import {
  IconAffiliate,
  IconArrowDown,
  IconArrowDownRight,
  IconArrowRoundaboutLeft,
  IconArrowUp,
  IconArrowUpLeft,
  IconBook,
  IconBrandGithub,
  IconBrandGoogle,
  IconCalendar,
  IconCards,
  IconCaretDownFilled,
  IconCaretUpFilled,
  IconChalkboard,
  IconCheck,
  IconCircleOff,
  IconCopy,
  IconDashboard,
  IconEye,
  IconFilter,
  IconHandStop,
  IconLoader2,
  IconLogout2,
  IconMail,
  IconMaximize,
  IconMenu,
  IconMinus,
  IconNavigation,
  IconPlayerPause,
  IconPlayerPlay,
  IconSearch,
  IconSmartHome,
  IconTableFilled,
  IconTrash,
  IconUserFilled,
  IconUsers,
  IconX,
  TablerIconsProps,
} from "@tabler/icons-react"

export const Icons = {
  Checked: IconCheck,
  Play: IconPlayerPlay,
  Copy: IconCopy,
  HandStop: IconHandStop,
  Delete: IconTrash,
  Navigation: IconNavigation,
  Menu: IconMenu,
  Pause: IconPlayerPause,
  FullScreen: IconMaximize,
  ArrowUp: IconArrowUp,
  ArrowDown: IconArrowDown,
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
  Google: IconBrandGoogle,
  SignatureArrow: IconArrowUpLeft,
  Logout: IconLogout2,
  ArrowDownRight: IconArrowDownRight,
  CircleOff: IconCircleOff,
  Eye: IconEye,
  Filter: IconFilter,
  Search: IconSearch,
  DashBoard: IconDashboard,
  MultiUsers: IconUsers,
  TableFilled: IconTableFilled,
  UserFilled: IconUserFilled,
  Checked: IconCheck,
  Minus: IconMinus,
  CaretUpFilled: IconCaretUpFilled,
  CaretDownFilled: IconCaretDownFilled,
}

type IIconKeys = keyof typeof Icons

export type { IIconKeys, TablerIconsProps }
