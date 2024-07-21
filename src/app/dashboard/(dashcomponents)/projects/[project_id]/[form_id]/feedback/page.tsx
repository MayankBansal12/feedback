"use client"

import { useState } from "react"


function Feedback() {
    const [feedback, setFeedback] = useState([])

    return (
        <div className="flex flex-col w-full h-full dark:bg-dark-secondary dark:text-white px-10">
            <div className="flex gap-4 justify-between items-center">
                <h1 className="pt-1 pb-3 text-xl font-semibold">all feedbacks</h1>
            </div>

            <div className="flex flex-col gap-2 my-4">
                {feedback.length > 0 ?
                    feedback.map((_, i) => (
                        <div key={i} className="px-4 py-2 border border-light-primary dark:border-light-primary rounded-lg w-full">
                            <p>
                                a user rated 4 stars for your app_name.{" "}
                                <span className="text-gray-400 text-sm dark:text-light-primary">
                                    3 days ago
                                </span>
                            </p>
                            <p className="text-md italic">&quot;Great app, I love it!&quot;</p>
                        </div>
                    ))
                    : <p className="flex justify-center items-center">no feedbacks yet!</p>
                }
            </div>
        </div >
    )
}

export default Feedback