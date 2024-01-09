import { create } from "zustand"
interface IUser {
  name: string
  email: string
  avatar: string
}
interface AuthState {
  user?: IUser
  tokens?: {
    accessToken: string
    refreshToken: string
  }
  isAuth: boolean
}

interface AuthActions {
  login: (
    user: IUser,
    tokens: { accessToken: string; refreshToken: string }
  ) => void
  logout: () => void
}

const initialState: AuthState = {
  user: undefined,
  tokens: undefined,
  isAuth: false,
}
const useAuth = create<AuthState & AuthActions>((set, get) => ({
  ...initialState,
  login: (user, tokens) => {
    set({
      user,
      tokens,
      isAuth: true,
    })
  },

  logout: () => {
    set({
      ...initialState,
    })
  },
}))

//Selectors
export const selectUser = (state: AuthState) => state.user
export const selectTokens = (state: AuthState) => state.tokens
export const selectIsAuth = (state: AuthState) => state.isAuth
export default useAuth
