// *********************
// Role of the component: Category wrapper that will contain title and category items
// Name of the component: CategoryMenu.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <CategoryMenu />
// Input parameters: no input parameters
// Output: section title and category items
// *********************

// make category menu this dynamic
"use client";
import React, { useEffect, useState } from "react";
import CategoryItem from "./CategoryItem";
import Image from "next/image";
import ENDPOINT from "../config/appConfig";
const CategoryMenu2 = () => {
//   const handleProductClick = () => {
//     onProductSelect(); // call the function to hide the category list
//   };
  const [categoryMenuList2, setCategoryMenuList2] = useState([]);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/categories/", { cache: "no-store" })
    // fetch(ENDPOINT.BASE_URL + "/api/categories/", { cache: "no-store" })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCategoryMenuList2(data);
      });
  }, []);

  return (
    <div className="p-0 bg-white">
      <div className="max-w-screen-2xl mx-auto py-2 gap-x-5 px-16 max-md:px-10 gap-y-5 grid grid-cols-5 max-lg:grid-cols-3 max-md:grid-cols-2 max-[450px]:grid-cols-1">
        {categoryMenuList2.map((item: any) => (
          <CategoryItem title={item.name} key={item.id} href={item.href}>
            {/* <Image
            /> */}

            <img 
            // onClick={handleProductClick}
            src={`/${item.image}`}
            width={48}
            height={48}
            alt={item.title}
             />
          </CategoryItem>
        ))}
      </div>
    </div>
  );
};

export default CategoryMenu2;
