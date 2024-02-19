import React from "react";

const Dashboard = () => {
  return (
    <div className="mx-8">
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-200 sm:text-6xl">
            Today's Meal Plan
          </h1>
        </div>
        <div className="grid grid-cols-9 grid-rows-3 gap-3">
        <div className="row-span-3 row-start-1">
              <img className="h-auto max-ws rounded-lg" src="/assets/images/break.jpg"/>
            </div>
            <div className="col-span-2 row-start-1">
              <h1 className="text-4xl font-bold tracking-tight row-start-1">Breakfast Patty Melt</h1>
              <p className="text-2xl"> 1234 kCal </p>
            </div>
            <div className="row-start-2 col-start-2">
              <p className="text-xl">Protein</p>
              <p className="text-xl">Fat</p>
              <p className="text-xl">Carbs</p>
            </div>
            <div className="row-start-2 col-start-3">
              <p className="text-xl">27 g</p>
              <p className="text-xl">66 g</p>
              <p className="text-xl">14 g</p>
            </div>
            <div className="row-span-3 row-start-1">
              <img className="h-auto max-ws rounded-lg" src="/assets/images/lunch.jpg"/>
            </div>
            <div className="col-span-2 row-start-1">
              <h1 className="text-4xl font-bold tracking-tight row-start-1">Simple Salad Lunch</h1>
              <p className="text-2xl"> 618 kCal </p>
            </div>
            <div className="row-start-2 col-start-5">
              <p className="text-xl">Protein</p>
              <p className="text-xl"> Fat</p>
              <p className="text-xl">Carbs</p>
            </div>
            <div className="row-start-2 col-start-6">
              <p className="text-xl">34 g</p>
              <p className="text-xl">32 g</p>
              <p className="text-xl">50 g</p>
            </div>
            <div className="row-span-3 row-start-1">
              <img className="h-auto max-ws rounded-lg" src="/assets/images/dinner.jpg"/>
            </div>
            <div className="col-span-2 row-start-1">
              <h1 className="text-4xl font-bold tracking-tight row-start-1">Sweet Potato, Eggplant, and Spinach Madras Curry</h1>
              <p className="text-2xl"> 228 kCal </p>
            </div>
            <div className="row-start-2 col-start-8">
              <p className="text-xl">Protein</p>
              <p className="text-xl">Fat</p>
              <p className="text-xl">Carbs</p>
            </div>
            <div className="row-start-2 col-start-9">
              <p className="text-xl">25 g</p>
              <p className="text-xl">55 g</p>
              <p className="text-xl">98 g</p>
            </div>
        </div>
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-200 sm:text-6xl">
            Tomorrow's Meal Plan
          </h1>
        </div>
        <div className="grid grid-cols-9 grid-rows-3 gap-3">
        <div className="row-span-3 row-start-1">
              <img className="h-auto max-ws rounded-lg" src="/assets/images/break1.jpg"/>
            </div>
            <div className="col-span-2 row-start-1">
              <h1 className="text-4xl font-bold tracking-tight row-start-1">The Wrangler Breakfast Taco</h1>
              <p className="text-2xl"> 465 kCal </p>
            </div>
            <div className="row-start-2 col-start-2">
              <p className="text-xl">Protein</p>
              <p className="text-xl">Fat</p>
              <p className="text-xl">Carbs</p>
            </div>
            <div className="row-start-2 col-start-3">
              <p className="text-xl">70 g</p>
              <p className="text-xl">45 g</p>
              <p className="text-xl">15 g</p>
            </div>
            <div className="row-span-3 row-start-1">
              <img className="h-auto max-ws rounded-lg" src="/assets/images/lunch1.jpg"/>
            </div>
            <div className="col-span-2 row-start-1">
              <h1 className="text-4xl font-bold tracking-tight row-start-1">Feta & clementine lunch bowl</h1>
              <p className="text-2xl"> 510 kCal </p>
            </div>
            <div className="row-start-2 col-start-5">
              <p className="text-xl">Protein</p>
              <p className="text-xl">Fat</p>
              <p className="text-xl">Carbs</p>
            </div>
            <div className="row-start-2 col-start-6">
              <p className="text-xl">50 g</p>
              <p className="text-xl">20 g</p>
              <p className="text-xl">65 g</p>
            </div>
            <div className="row-span-3 row-start-1">
              <img className="h-auto max-ws rounded-lg" src="/assets/images/dinner1.jpg"/>
            </div>
            <div className="col-span-2 row-start-1">
              <h1 className="text-4xl font-bold tracking-tight row-start-1">Smoked Oyster and Potato Salad with Arugula</h1>
              <p className="text-2xl"> 295 kCal </p>
            </div>
            <div className="row-start-2 col-start-8">
              <p className="text-xl">Protein</p>
              <p className="text-xl">Fat</p>
              <p className="text-xl">Carbs</p>
            </div>
            <div className="row-start-2 col-start-9">
              <p className="text-xl">16 g</p>
              <p className="text-xl">30 g</p>
              <p className="text-xl">50 g</p>
            </div>
        </div>
    </div>
  );
};

export default Dashboard;