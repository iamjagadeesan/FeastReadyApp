import React, { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../context/StoreContext';
import FoodItem from './FoodItem.jsx';

const FoodDisplay = ({ category }) => {
  const { food_list, search, searchMode } = useContext(StoreContext);
  const [loading, setLoading] = useState(true); // Loading only for food_list

  useEffect(() => {
    if (true) {
      setTimeout(() => setLoading(false), 1000); // Simulated delay for food_list load
    }
  }, []);

  // Filter logic: Only applies when searchMode is true
  const displayFood = searchMode && search.trim()
    ? food_list.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
    : category === "All"
    ? food_list
    : food_list.filter(item => item.category === category);

  return (
    <div className="bg-gradient-to-br from-green-800 via-green-700 to-green-900 lg:px-24 xl:px-32">
      <h2 className="z-10 w-max -mb-4 p-4 font-f text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white via-yellow-300 to-yellow-500 [text-shadow:10px_10px_20px_rgba(0,0,0,0.2)]">
        Top dishes near you
      </h2>

      {/* Show loader only while food_list is loading */}
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="h-16 w-16 border-4 border-yellow-300 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="w-full p-4 py-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-4 md:gap-x-2 md:gap-y-6 lg:gap-x-4 lg:gap-y-8 place-items-center">
          {displayFood.length > 0 ? (
            displayFood.map((item, index) => (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
                index={index}
              />
            ))
          ) : (
            <p className="text-center font-bold text-xl text-green-950 col-span-full">No matching food items found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default FoodDisplay;



