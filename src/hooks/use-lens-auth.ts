import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { LocalStorage } from '@/config/lens'

interface Tokens {
  accessToken: null | string
  refreshToken: null | string
}

interface State {
  accessToken: Tokens['accessToken']
  hydrateAuthTokens: () => Tokens
  refreshToken: Tokens['refreshToken']
  signIn: (tokens: { accessToken: string; refreshToken: string }) => void
  signOut: () => void
}

const store = create(
  persist<State>(
    (set, get) => ({
      accessToken: null,
      hydrateAuthTokens: () => {
        const { accessToken, refreshToken } = get()
        return { accessToken, refreshToken }
      },
      refreshToken: null,
      signIn: ({ accessToken, refreshToken }) => set({ accessToken, refreshToken }),
      signOut: async () => {
        // Clear localStorage
        const allLocalStorageStores = Object.values(LocalStorage).filter((value) => value !== LocalStorage.SearchStore)
        for (const store of allLocalStorageStores) {
          localStorage.removeItem(store)
        }
      },
    }),
    { name: LocalStorage.AuthStore },
  ),
)

export const signIn = (tokens: { accessToken: string; refreshToken: string }) => store.getState().signIn(tokens)
export const signOut = () => store.getState().signOut()
export const hydrateAuthTokens = () => store.getState().hydrateAuthTokens()
