// *********************
// Role of the component: Filters on shop page
// Name of the component: Filters.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <Filters />
// Input parameters: no input parameters
// Output: stock, rating and price filter
// *********************

"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useSortStore } from "@/app/_zustand/sortStore";
import { usePaginationStore } from "@/app/_zustand/paginationStore";
import ENDPOINT from '@/config/appConfig';
import { Button, Stack } from '@mui/material';

import Link from "next/link";

interface InputCategory {
  inStock: { text: string, isChecked: boolean },
  outOfStock: { text: string, isChecked: boolean },
  priceFilter: { text: string, value: number },
  ratingFilter: { text: string, value: number },
}

  const Filters = () => {
  const pathname = usePathname();
  const { replace } = useRouter();
  const category = pathname.split('/')[2]; 

  // getting current page number from Zustand store
  const { page } = usePaginationStore();

  const [inputCategory, setInputCategory] = useState<InputCategory>({
    inStock: { text: "instock", isChecked: true },
    outOfStock: { text: "outofstock", isChecked: false },
    priceFilter: { text: "price", value: 3000 },
    ratingFilter: { text: "rating", value: 0 },
  });
  const { sortBy } = useSortStore();

  useEffect(() => {
    const params = new URLSearchParams();
    // setting URL params and after that putting them all in URL
    params.set("outOfStock", inputCategory.outOfStock.isChecked.toString());
    params.set("inStock", inputCategory.inStock.isChecked.toString());
    params.set("rating", inputCategory.ratingFilter.value.toString());
    params.set("price", inputCategory.priceFilter.value.toString());
    params.set("sort", sortBy);
    params.set("page", page.toString());
    replace(`${pathname}?${params}`);
  }, [inputCategory, sortBy, page]);



  const [categoryMenuList, setCategoryMenuList] = useState([]);
  const excludedSlugs = ['inspired-products', 'topselling-products', 'new-products'];

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/categories/", { cache: "no-store" })
    // fetch(ENDPOINT.BASE_URL + "/api/categories/", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        setCategoryMenuList(data);
      });
  }, []);

  return (
    <div>
      <h3 className="text-2xl mb-2">Filters</h3>
      <div className="divider"></div>
      <div className="flex flex-col gap-y-1">
        {/* <h3 className="text-xl mb-2">Availability</h3> */}
        <h3 className="text-xl mb-2">Category</h3>
        {/* <Link href={`/shop${item.href}`} key={item.id} passHref> */}
    <div className="form-control">
      {/* <Stack spacing={1}>
        {categoryMenuList
           .filter((item:any) => !excludedSlugs.includes(item.name )) // Filter out the excluded slugs
           .map((item:any) => (
            <Link href={`/shop${item.href}`} key={item.id} passHref>
              <Button
                variant="contained" // Change to 'contained' or 'text' as needed
                className="cursor-pointer"
                sx={{
                  color: 'black',
                  borderColor: 'black',
                  '&:hover': {
                    color: 'white',
                    backgroundColor: "#f37321",
                    borderColor: 'orange',
                  },
                }}
              >
                {item.name}
              </Button>
            </Link>
          ))}
      </Stack> */}
        <Stack spacing={1}>
        {categoryMenuList
          .filter((item:any) => !excludedSlugs.includes(item.name))
          .map((item : any) => {
            const isActive = pathname === `/shop${item.href}`; // Check if current path matches
            return (
              <Link href={`/shop${item.href}`} key={item.id} passHref>
                <Button
                  variant="contained"
                  className="cursor-pointer"
                  sx={{
                    width:"200px",
                    color: isActive ? 'white' : 'black',
                    backgroundColor: isActive ? "#f37321 !important" : 'transparent',
                    borderColor: isActive ? 'black !important' : 'white',
                    '&:hover': {
                      color: 'white',
                      backgroundColor: "#f37321 !important",
                      borderColor: 'orange !important',
                    },
                  }}
                
                >
                  {item.name}
                </Button>
              </Link>
            );
          })}
      </Stack>
    </div>
     
      </div>

      <div className="divider"></div>
      {/* <div className="flex flex-col gap-y-1 ">
        <h3 className="text-xl mb-2">Price</h3>
        <div>
          <input
            type="range"
            min={0}
            max={3000}
            step={10}
            value={inputCategory.priceFilter.value}
            className="range"
            onChange={(e) =>
              setInputCategory({
                ...inputCategory,
                priceFilter: {
                  text: "price",
                  value: Number(e.target.value),
                },
              })
            }
          />
          <span>{`Max price: $${inputCategory.priceFilter.value}`}</span>
        </div>
      </div>

      <div className="divider"></div>

      <div>
        <h3 className="text-xl mb-2">Minimum Rating:</h3>
        <input
          type="range"
          min={0}
          max="5"
          value={inputCategory.ratingFilter.value}
          onChange={(e) =>
            setInputCategory({
              ...inputCategory,
              ratingFilter: { text: "rating", value: Number(e.target.value) },
            })
          }
          className="range range-info"
          step="1"
        />
        <div className="w-full flex justify-between text-xs px-2">
          <span>0</span>
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
        </div>
      </div> */}
    </div>
  );
};

export default Filters;
