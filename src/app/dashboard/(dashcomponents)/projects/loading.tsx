import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <div className="bg-white dark:bg-dark-secondary h-full flex flex-col justify-center items-center space-y-3">
            <Skeleton className="h-1/3 w-1/2 dark:bg-dark-primary rounded-xl" />
            <Skeleton className="h-8 w-1/2 dark:bg-dark-primary rounded-xl" />
            <Skeleton className="h-4 w-1/3 dark:bg-dark-primary rounded-xl" />
        </div>
    )
}