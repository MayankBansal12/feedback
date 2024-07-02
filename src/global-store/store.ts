import { UserType } from "@/types/type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserStoreType = {
    user: UserType | null,
    setUser: (user: UserType) => void
    clearUser: () => void
}

const useUserStore = create<UserStoreType>()(persist(
    (set) => ({
        user: null,
        setUser: (user) => set({ user }),
        clearUser: () => set({ user: null })
    }),
    {
        name: "user-storage",
        skipHydration: true
    }
))


export { useUserStore }