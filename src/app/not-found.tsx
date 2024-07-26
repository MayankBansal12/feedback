import Nav from "@/components/nav";
import Link from "next/link";

export default function NotLoading() {
    return (
        <>
            <Nav />
            <div className="flex flex-col gap-4 justify-center items-center h-[90vh] bg-white dark:bg-dark-secondary font-default">
                <h1 className="text-2xl font-bold">404 not found.</h1>
                <div className="flex flex-col gap-1 items-center">
                    <p>yo! looks like you are lost!</p>
                    <p>dw, we got ya</p>
                </div>

                <div className="flex gap-4 items-center">
                    <Link href="/dashboard" className="bg-accent-link hover:bg-accent-buttonhover transition-all px-2 py-1 rounded-full text-white">back to dashboard</Link>
                    <Link href="/" className="bg-accent-link hover:bg-accent-buttonhover transition-all px-2 py-1 rounded-full text-white">back to landing page</Link>
                </div>
            </div >
        </>
    )
}