import { IconMail, IconMaximize, IconPlayerPause, IconPlayerPlay, IconX, TablerIconsProps } from '@tabler/icons-react';

const Icons = {
  Play: IconPlayerPlay,
  Pause: IconPlayerPause,
  FullScreen: IconMaximize,
  Email: IconMail,
  X: IconX,
};

type IIconKeys = keyof typeof Icons;

export default Icons;
export type { IIconKeys, TablerIconsProps };
