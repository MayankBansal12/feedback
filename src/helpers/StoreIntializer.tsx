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
            setUser(data.data);
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    return <></>
}