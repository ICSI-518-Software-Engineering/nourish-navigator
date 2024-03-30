"use client";

import React, { useEffect, useState } from "react";
import { mealPlan } from "@/api/mealPlanning";
import { ThumbsUp, ThumbsDown, CheckCircle, CircleSlash2Icon } from "lucide-react";

interface MealReactions {
    [mealName: string]: {
        likeDislike?: 'like' | 'dislike';
        consumed?: boolean;
        rejected?: boolean;
    };
}

const MealPlannerPage: React.FC = () => {

    const [currentMeals, setCurrentMeals] = useState<any>([])
    const [mealReactions, setMealReactions] = useState<MealReactions>({});

    useEffect(() => {
        const fetchMealPlan = async() => {
            const meals = await mealPlan();
            setCurrentMeals(meals)
        }

        fetchMealPlan()
    }, []);

    const handleLikeDislike = (meal: any, reaction: 'like' | 'dislike') => {
        const mealName = meal.mealName
        console.log(meal)
        setMealReactions(prevState => ({
            ...prevState,
            [mealName]: {
                ...prevState[mealName],
                likeDislike: prevState[mealName]?.likeDislike === reaction ? undefined : reaction,
                consumed: prevState[mealName]?.consumed
            }
        }));
    };

    const handleMarkConsumed = (meal: any) => {
        const mealName = meal.mealName
        setMealReactions(prevState => ({
            ...prevState,
            [mealName]: {
                ...prevState[mealName],
                likeDislike: prevState[mealName]?.likeDislike,
                consumed: !prevState[mealName]?.consumed
            }
        }));
    };

    const handleReject = (meal: any) => {
        const mealName = meal.mealName
        setMealReactions(prevState => ({
            ...prevState,
            [mealName]: {
                ...prevState[mealName],
                rejected: !prevState[mealName]?.rejected, // Toggle reject status
            }
        }));
    };


    return (
        <div>
            <h1>Meal Planner</h1>
            {currentMeals.map((plan: any, planIndex: any) => (
                <React.Fragment key={planIndex}>
                    <div style={{
                        textAlign: 'center',
                        fontSize: '24px',
                        margin: '20px 0',
                        color: 'white',
                    }} className="rounded-xl border bg-card text-card-foreground shadow dark:border-gold-900 p-6">
                        {plan.date}
                    </div>
                    <div className="rounded-xl border bg-card text-card-foreground shadow dark:border-gold-900 p-16" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '40px' }}>
                        {plan.meal.map((m: any, index: any) => (
                            <div key={index} style={{
                                textAlign: 'center',
                                borderRadius: '8px', 
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}>
                                <h3 style={{
                                    fontSize: '1.5rem', 
                                    fontWeight: 'bold', 
                                    margin: '0 0 10px 0' 
                                }}>{m.mealName}</h3>
                                {m.image && <img src={m.image} alt={m.mealName} style={{ maxWidth: '100%', height: 'auto', marginBottom: '10px' }} />}
                                <p>Calories: {Math.round(m.calories)}</p>
                                <p>Protein: {Math.round(m.protein)}</p>
                                <p>Fat: {Math.round(m.fat)}</p>
                                <p>Carbs: {Math.round(m.carbs)}</p>
                                <a href={m.instructions} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Instructions</a>
                                <div className="flex justify-center items-center mt-3 space-x-2">
                                    <button onClick={() => handleLikeDislike(m, 'like')} className={`p-2 rounded-full text-white shadow-lg transform transition-transform duration-200 ${mealReactions[m.mealName]?.likeDislike === 'like' ? 'bg-green-500 hover:bg-green-600' : 'bg-green-200 hover:bg-green-300'}`}>
                                        <ThumbsUp className="w-6 h-6" />
                                    </button>
                                    <button onClick={() => handleMarkConsumed(m)} className={`p-2 rounded-full text-white shadow-lg transform transition-transform duration-200 ${mealReactions[m.mealName]?.consumed ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-200 hover:bg-blue-300'}`}>
                                        <CheckCircle className="w-6 h-6" />
                                    </button>
                                    <button onClick={() => handleLikeDislike(m, 'dislike')} className={`p-2 rounded-full text-white shadow-lg transform transition-transform duration-200 ${mealReactions[m.mealName]?.likeDislike === 'dislike' ? 'bg-red-500 hover:bg-red-600' : 'bg-red-200 hover:bg-red-300'}`}>
                                        <ThumbsDown className="w-6 h-6" />
                                    </button>
                                    <button onClick={() => handleReject(m.mealName)}className={`p-2 rounded-full text-white shadow-lg transform transition-transform duration-200 ${mealReactions[m.mealName]?.rejected ? 'bg-red-500 hover:bg-red-600' : 'bg-red-200 hover:bg-red-300'}`}>
                                        <CircleSlash2Icon className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </React.Fragment>
            ))}
        </div>
    );
};

export default MealPlannerPage;