import http from "./http"
import { getLoggedInUserDetails } from "@/app/(auth)/utils"

export async function mealPlan() {
    try {
        console.log('frontend API start')
        const user = getLoggedInUserDetails()
        const res = await http.get(`/planner/mealselection/${user?._id}`)
        console.log('frontend API finish')
        return(res.data)

    }
    catch(error){
        console.error(error)
    }
}