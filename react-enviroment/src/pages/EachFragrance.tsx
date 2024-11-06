import React from 'react';
import { useParams } from 'react-router-dom';
import fragranceImage from '../placeholders/fragranceImage.jpg';

const EachFragrance: React.FC = () => {
    const { fragranceId } = useParams<{ fragranceId: string }>();

    return (
    <main >
       <div className="flex items-center mt-4 mr-32  justify-center ">
            <div className="w-1/2 h-full flex items-center justify-center overflow-hidden rounded-lg">
                <img src={'/office_for_men.png'} alt="Fragrance" className="object-scale-down  w-3/4 " />
            </div>
            <div className="mb-32 mt-14 mr-5 ">
             <h1 className="font-bold justify-right text-6xl font-title"> OFFICE FOR MEN </h1>
               <h2 className="text-xl justify-left mr-20 font-title pl-1 pt-2"> by Fragrance One</h2>

               <div className="pl-1 pt-20 text-center font-title text-2xl">
                Top Notes
               </div>

               <div className="pl-1 pt-20 text-center font-title text-2xl">
                Middle Notes
               </div>

               <div className="pl-1 pt-20 text-center font-title text-2xl">
                Base Notes
               </div>
            </div>
          
        </div>

        <div className="mt-10 min-h-screen bg-gray-200 min-w-screen">
            <div className="">
                <div>
                    <h1 className="text-center text-black font-bold mt-10 font-title text-4xl"> Where to Buy/Description </h1>
                </div>

                <div className="text-center text-xl font-body font-bold mt-32">
                    This is a short description of what the fragrance is and smells like. Will soon be replaced. 
                </div>
            </div>
          </div>
    </main>
    
    );
};

export default EachFragrance;
