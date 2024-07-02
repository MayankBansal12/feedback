"use client"

import { useUserStore } from "@/global-store/store";
import { useEffect } from "react"

export default function StoreIntializer() {
    const { user, setUser } = useUserStore()
    useEffect(() => {
        // hydrate persisted store after on mount
        useUserStore.persist.rehydrate();

        const token = localStorage.getItem('token');
        setTimeout(() => {
            if (token && user === null) {
                fetchUserDetails(token);
            }
        }, 1000)

        console.log("user from store: ", user)
    }, []);

    const fetchUserDetails = async (token: string) => {
        console.log("api call to fetch user details: ")
        try {
            const response = await fetch('/api/me', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            console.log("data from token ", data.data)
            setUser(data.data.user);
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    return <></>
}