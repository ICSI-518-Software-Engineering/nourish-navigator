"use client";

import React, { useEffect } from "react";
import { getLoggedInUserDetails } from "../../(auth)/utils";
import http from "@/api/http";


function mealPlan(userID: string) {
    http.get(`/planner/meals/${userID}`)
}

const MealPlannerPage: React.FC = () => {

const userDetails = getLoggedInUserDetails();
    if (!userDetails){
        console.log('No user found')
    }
    else{
        mealPlan(userDetails._id)
    }
    return (
        <div>MealPlan</div>
    );
};

export default MealPlannerPage;