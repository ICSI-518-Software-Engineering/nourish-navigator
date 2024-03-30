import { resolve } from "path/posix"
import http from "./http"
import { getLoggedInUserDetails } from "@/app/(auth)/utils"

export async function mealPlan() {
    try {
        const user = getLoggedInUserDetails()
        const res = await http.get(`/planner/mealselection/${user?._id}`)
        return(res.data)
    }
    catch(error){
        console.error(error)
    }
}