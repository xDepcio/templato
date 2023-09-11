'use client'

import { usePathname } from 'next/navigation'
import { Doc, allDocs } from "@/.contentlayer/generated";
import Link from "next/link";
import { cn } from '@/lib/utils';


export default function DocsSideNav() {
    const sortedArr = allDocs.sort((a, b) => a.sortNum - b.sortNum)
    const path = decodeURI(usePathname())

    const categorizedDocs = sortedArr.reduce((acc: { [key: Doc['_raw']['sourceFileDir']]: Doc[] }, doc) => {
        const currCatContent = acc[doc._raw.sourceFileDir]
        return {
            ...acc,
            [doc._raw.sourceFileDir]: [...(currCatContent ? currCatContent : []), doc]
        }
    }, {})

    return (
        <div className="border-r-[1px] pr-4">
            {Object.entries(categorizedDocs).map(([cat, docs]) => {
                return (
                    <div className="mb-4">
                        <p className="text-foreground font-semibold">{cat}</p>
                        <div className="flex flex-col">
                            {docs.map((doc) => {
                                console.log(path)
                                const isActive = path === `/docs/${doc._raw.flattenedPath}`

                                return <Link href={`/docs/${doc._raw.flattenedPath}`} className={cn("ml-0 text-muted-foreground hover:text-indigo-700 transition-all hover:bg-indigo-50 py-1 px-2 rounded-md", isActive ? "bg-indigo-50 text-indigo-700" : "")}>{doc.title}</Link>
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
