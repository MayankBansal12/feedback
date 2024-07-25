import { Schema } from "mongoose";
import { FormEvent, SetStateAction, Dispatch } from "react"

export interface LoginFormProps {
    email: string;
    setEmail: Dispatch<SetStateAction<string>>;
    password: string;
    setPassword: Dispatch<SetStateAction<string>>;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    isLoading: boolean;
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
    isLoading: boolean;
}


export interface UserType {
    userId: string
    name: string
    email: string
    isVerified: boolean
    clientSecret: string
    createdDate: Date
}

export interface ProjectType {
    _id: string
    name: string
    desc: string
    isDeleted: boolean
    createdDate: Date
}

export interface FormType {
    _id: string
    name: string
    heading: string
    isDeleted: boolean
    projectId: Schema.Types.ObjectId
    createdDate: Date
}
