import { IconCreditCard } from "@tabler/icons-react"
import {
  IconAffiliate,
  IconAlertCircle,
  IconArrowDown,
  IconArrowDownRight,
  IconArrowRight,
  IconArrowRoundaboutLeft,
  IconArrowUp,
  IconArrowUpLeft,
  IconArrowsJoin,
  IconArrowsRight,
  IconArrowsShuffle2,
  IconArtboard,
  IconBan,
  IconBold,
  IconBook,
  IconBraces,
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandTelegram,
  IconCalendar,
  IconCards,
  IconCaretDownFilled,
  IconCaretUpFilled,
  IconChalkboard,
  IconCheck,
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronUp,
  IconCircleOff,
  IconClock,
  IconCopy,
  IconDashboard,
  IconDeviceDesktop,
  IconDeviceGamepad2,
  IconDots,
  IconDotsVertical,
  IconEye,
  IconEyeOff,
  IconFilter,
  IconFingerprint,
  IconFlag2,
  IconFlask,
  IconGlobe,
  IconH1,
  IconH2,
  IconH3,
  IconHandStop,
  IconHelp,
  IconHighlight,
  IconInfoCircle,
  IconItalic,
  IconLanguage,
  IconLifebuoy,
  IconLink,
  IconList,
  IconLoader2,
  IconLogout2,
  IconMail,
  IconMath,
  IconMaximize,
  IconMenu,
  IconMessage,
  IconMinus,
  IconMoodEmptyFilled,
  IconNavigation,
  IconPencil,
  IconPlayerPause,
  IconPlayerPlay,
  IconPlus,
  IconQuote,
  IconRefresh,
  IconSearch,
  IconSettings,
  IconSmartHome,
  IconStar,
  IconStrikethrough,
  IconTableFilled,
  IconTrash,
  IconTypography,
  IconUnderline,
  IconUser,
  IconUserFilled,
  IconUsers,
  IconX,
  TablerIconsProps,
} from "@tabler/icons-react"

export const Icons = {
  Plus: IconPlus,
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
  Refresh: IconRefresh,
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
  EyeOff: IconEyeOff,
  Filter: IconFilter,
  Report: IconFlag2,
  Search: IconSearch,
  DashBoard: IconDashboard,
  MultiUsers: IconUsers,
  TableFilled: IconTableFilled,
  UserFilled: IconUserFilled,
  Minus: IconMinus,
  CaretUpFilled: IconCaretUpFilled,
  CaretDownFilled: IconCaretDownFilled,
  Support: IconLifebuoy,
  Link: IconLink,
  DotVertical: IconDotsVertical,
  Edit: IconPencil,
  Empty: IconMoodEmptyFilled,
  Send: IconBrandTelegram,
  Dot: IconDots,
  Help: IconHelp,
  Ban: IconBan,
  Timer: IconClock,
  ArtBoard: IconArtboard,
  Join: IconArrowsJoin,

  //Chevrons
  ChevronUp: IconChevronUp,
  ChevronDown: IconChevronDown,
  ChevronLeft: IconChevronLeft,
  ChevronRight: IconChevronRight,
  Calendar: IconCalendar,
  ArrowRight: IconArrowRight,
  ArrowsRight: IconArrowsRight,
  Comment: IconMessage,

  //Control
  Shuffle: IconArrowsShuffle2,
  Star: IconStar,
  Fullscreen: IconMaximize,

  //Subjects
  Math: IconMath,
  Literature: IconTypography,
  History: IconArrowRoundaboutLeft,
  Science: IconFlask,
  Languague: IconLanguage,
  Computer: IconDeviceDesktop,
  Geography: IconGlobe,

  // Editor
  Game: IconDeviceGamepad2,
  Bold: IconBold,
  Italic: IconItalic,
  Strike: IconStrikethrough,
  Code: IconBraces,
  Underline: IconUnderline,
  Hightline: IconHighlight,
  Bullet: IconList,
  Heading1: IconH1,
  Heading2: IconH2,
  Heading3: IconH3,
  Quote: IconQuote,

  // Navigation menu
  NavAccount: IconUser,
  NavProfile: IconFingerprint,
  NavPreference: IconSettings,

  // Notification
  Info: IconInfoCircle,
  Warning: IconAlertCircle,
  Settings: IconSettings,
  Error: IconBan,
  Payment: IconCreditCard,
}

type IIconKeys = keyof typeof Icons

export type { IIconKeys, TablerIconsProps }
