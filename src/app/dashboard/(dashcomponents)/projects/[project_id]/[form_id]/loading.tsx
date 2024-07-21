import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <div className="bg-white dark:bg-dark-secondary h-full flex flex-col justify-center items-center space-y-3">
            <Skeleton className="h-2/3 w-2/3 dark:bg-dark-primary rounded-xl" />
        </div>
    )
}