import { MainNavItem } from "@/components/ui/guest-navbar/guest-navbar"

const MAIN_NAVBAR_ITEMS: MainNavItem[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Contact",
    href: "/contact",
  },
  {
    title: "Blog",
    href: "/blog",
  },
]

const SUBJECTS_NAVBAR_ITEMS: MainNavItem[] = [
  {
    title: "subject_item.Math",
    href: "quizbank?subject=Math",
    icon: "Math",
  },
  {
    title: "subject_item.Literature",
    href: "quizbank?subject=Literature",
    icon: "Literature",
  },

  {
    title: "subject_item.Science",
    href: "quizbank?subject=Science",
    icon: "Science",
  },
  {
    title: "subject_item.Language",
    href: "quizbank?subject=Language",
    icon: "Languague",
  },
  {
    title: "subject_item.Computer",
    href: "quizbank?subject=Computer",
    icon: "Computer",
  },
  {
    title: "subject_item.Geography",
    href: "quizbank?subject=Geography",
    icon: "Geography",
  },
  {
    title: "subject_item.Other",
    href: "quizbank",
    icon: "Dot",
  },
]
export { MAIN_NAVBAR_ITEMS, SUBJECTS_NAVBAR_ITEMS }
