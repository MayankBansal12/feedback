import axios from 'axios'
import { useRouter } from 'next/navigation'

const useApi = () => {
    const router = useRouter()
    const callApi = async (endpoint: string, method = 'GET', data = {}, clientId: string = '', clientSecret: string = '') => {
        const token = localStorage.getItem('token')
        if (!token) {
            router.replace('/auth/login')
        }
        try {
            const config = {
                method: method,
                url: "/api" + endpoint,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                    clientId: clientId,
                    clientSecret: clientSecret
                },
                data: data,
            }

            const result = await axios(config)
            return result
        } catch (error: any) {
            if (error?.response?.data?.token === false) {
                router.replace('/auth/login')
            }
            if (error?.response?.data?.valid === false) {
                localStorage.removeItem('token')
                router.replace('/auth/login')
            }
            console.log('Error while calling api: ', error)
            return error.response
        }
    }
    return callApi
}

export default useApi