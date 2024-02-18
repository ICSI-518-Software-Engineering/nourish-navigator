import MaxWidthContainer from "@/components/MaxWidthContainer";
import React from "react";

type HomePageProps = {};

const HomePage: React.FC<HomePageProps> = (props) => {
  return (
    <>
      <MaxWidthContainer>
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-200 sm:text-6xl">
            One stop solution for{" "}
            <span className="text-teal-300">meal planning</span>.
          </h1>
          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
            Welcome to Nourish Navigator. Every meal plan is generated based on
            the user goals.
          </p>
          {/* <div className='flex flex-col sm:flex-row gap-4 mt-6'>
            <Link
              href='/products'
              className={buttonVariants()}>
              Browse Trending
            </Link>
            <Button variant='ghost'>
              Our quality promise &rarr;
            </Button>
          </div> */}
        </div>
      </MaxWidthContainer>
    </>
  );
};

export default HomePage;
