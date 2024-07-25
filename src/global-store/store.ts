import { FormType, ProjectType, UserType } from "@/types/type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserStoreType = {
    user: UserType | null,
    setUser: (user: UserType) => void
    clearUser: () => void
}

type ProjectStoreType = {
    project: ProjectType | null,
    setProject: (project: ProjectType) => void
    clearProject: () => void
}

type FormStoreType = {
    form: FormType | null,
    setForm: (form: FormType) => void
    clearForm: () => void
}

const useUserStore = create<UserStoreType>()(
    persist(
        (set) => ({
            user: null,
            setUser: (user) => set({ user }),
            clearUser: () => set({ user: null })
        }),
        {
            name: "user-storage"
        }
    )
)

const useProjectStore = create<ProjectStoreType>()(
    persist(
        (set) => ({
            project: null,
            setProject: (project: ProjectType) => set({ project }),
            clearProject: () => set({ project: null }),
        }),
        {
            name: 'project-storage'
        }
    )
);

const useFormStore = create<FormStoreType>()(
    persist(
        (set) => ({
            form: null,
            setForm: (form) => set({ form }),
            clearForm: () => set({ form: null })
        }),
        {
            name: "form-storage"
        }
    )
)


export { useUserStore, useProjectStore, useFormStore }