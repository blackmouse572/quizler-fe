import { User } from "@/types"
import { create } from "zustand"

type UserState = {
  isAuth: boolean
  user?: User
}

type UserAction = {
  setUser: (user: User) => void
  logout: () => void
}

const initialState: UserState = {
  isAuth: false,
}

export const useUser = create<UserState & UserAction>((set) => ({
  ...initialState,
  setUser: (user) => set({ isAuth: true, user }),
  logout: () => set({ isAuth: false, user: undefined }),
}))
