import { IconArrowUpLeft, IconBrandGithub, IconCards, IconLoader2, IconMail, IconMaximize, IconPlayerPause, IconPlayerPlay, IconX, TablerIconsProps } from '@tabler/icons-react';

export const Icons = {
  Play: IconPlayerPlay,
  Pause: IconPlayerPause,
  FullScreen: IconMaximize,
  Email: IconMail,
  X: IconX,
  Spinner: IconLoader2,
  Icon: IconCards,
  Github: IconBrandGithub,
  SignatureArrow: IconArrowUpLeft
};

type IIconKeys = keyof typeof Icons;

export type { IIconKeys, TablerIconsProps };
