import { FormEvent, SetStateAction, Dispatch } from "react"

export interface LoginFormProps {
    email: string;
    setEmail: Dispatch<SetStateAction<string>>;
    password: string;
    setPassword: Dispatch<SetStateAction<string>>;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export interface RegisterFormProps {
    name: string;
    setName: Dispatch<SetStateAction<string>>;
    email: string;
    setEmail: Dispatch<SetStateAction<string>>;
    password: string;
    setPassword: Dispatch<SetStateAction<string>>;
    confirmPassword: string;
    setConfirmPassword: Dispatch<SetStateAction<string>>;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}
