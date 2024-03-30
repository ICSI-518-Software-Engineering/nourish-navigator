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

export async function addDislikeMeal(meal: any){
    try {
        const user = getLoggedInUserDetails()
        const res = await http.post(`/planner/adddislikemeal/${user?._id}`, {meal})
        return res.data
    }
    catch(error){
        console.error(error)
    }
}

export async function removeDislikeMeal(meal: any){
    try {
        const user = getLoggedInUserDetails()
        const res = await http.post(`/planner/removedislikemeal/${user?._id}`, {meal})
        return res.data
    }
    catch(error){
        console.error(error)
    }
}

export async function addLikeMeal(meal: any){
    try {
        const user = getLoggedInUserDetails()
        const res = await http.post(`/planner/addlikemeal/${user?._id}`, {meal})
        return res.data
    }
    catch(error){
        console.error(error)
    }
}

export async function removeLikeMeal(meal: any){
    try {
        const user = getLoggedInUserDetails()
        const res = await http.post(`/planner/removelikemeal/${user?._id}`, {meal})
        return res.data
    }
    catch(error){
        console.error(error)
    }
}