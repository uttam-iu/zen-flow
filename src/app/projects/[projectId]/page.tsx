'use client'
import { useParams } from "next/navigation";

export default function Project() {
    const params = useParams<{ projectId: string }>()
    console.log(params)

    return <div>Prject</div>


}