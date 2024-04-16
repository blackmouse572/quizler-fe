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
]

const SUBJECTS_NAVBAR_ITEMS: MainNavItem[] = [
  {
    title: "subject_item.Math",
    href: "/category?tag=Math",
    icon: "Math",
  },
  {
    title: "subject_item.Literature",
    href: "/category?tag=Literature",
    icon: "Literature",
  },

  {
    title: "subject_item.Science",
    href: "/category?tag=Science",
    icon: "Science",
  },
  {
    title: "subject_item.Languages",
    href: "/category?tag=Language",
    icon: "Languague",
  },
  {
    title: "subject_item.Computer Science",
    href: "/category?tag=Computer",
    icon: "Computer",
  },
  {
    title: "subject_item.Geography",
    href: "/category?tag=Geography",
    icon: "Geography",
  },
  {
    title: "subject_item.Other",
    href: "/category?tag=Other",
    icon: "Dot",
  },
]

const PROFILE_SIDEBAR_ITEMS: MainNavItem[] = [
  {
    icon: "NavProfile",
    title: "navigation_menu.edit_profile",
    href: "/profile/",
  },
  {
    icon: "NavAccount",
    title: "navigation_menu.edit_account",
    href: "/profile/account",
  },
  {
    icon: "NavPreference",
    title: "navigation_menu.edit_preference",
    href: "/profile/preference",
  },
]

const CLASSROOM_SIDEBAR_TEACHER_ITEMS: (id: string) => MainNavItem[] = (id) => [
  {
    icon: "ArtBoard",
    title: "navbar.index",
    href: `/classrooms/${id}/`,
  },
  {
    icon: "Game",
    title: "navbar.games",
    href: `/classrooms/${id}/games`,
  },
  {
    icon: "Icon",
    title: "navbar.quizbanks",
    href: `/classrooms/${id}/quizbanks`,
  },
  {
    icon: "MultiUsers",
    title: "navbar.members",
    href: `/classrooms/${id}/members`,
  },
]

const CLASSROOM_SIDEBAR_STUDENT_ITEMS: (id: string) => MainNavItem[] = (id) => [
  {
    icon: "ArtBoard",
    title: "navbar.index",
    href: `/classrooms/${id}/`,
  },
  {
    icon: "Game",
    title: "navbar.games",
    href: `/classrooms/${id}/games`,
  },
  {
    icon: "Icon",
    title: "navbar.quizbanks",
    href: `/classrooms/${id}/quizbanks`,
  },
]

export {
  CLASSROOM_SIDEBAR_TEACHER_ITEMS,
  CLASSROOM_SIDEBAR_STUDENT_ITEMS,
  MAIN_NAVBAR_ITEMS,
  PROFILE_SIDEBAR_ITEMS,
  SUBJECTS_NAVBAR_ITEMS,
}
