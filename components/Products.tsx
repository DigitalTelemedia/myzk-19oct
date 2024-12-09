// *********************
// Role of the component: Showing products on the shop page with applied filter and sort
// Name of the component: Products.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <Products slug={slug} />
// Input parameters: { slug }: any
// Output: products grid
// *********************
"use client"
import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
// import ENDPOINT from "../config/appConfig";
import ENDPOINT from '@/config/appConfig';

const Products =  ({ slug }: any) => {
  const [products, setProducts] = useState([]);

 
  // const category =slug?.params?.slug[0] || "*"
    // Ensure `slug` is defined and in the expected format
    useEffect(() => {
      let url;
    
      // Check if slug.params.slug is an array and contains elements
      if (Array.isArray(slug?.params?.slug) && slug.params.slug.length > 0) {
        const category = slug.params.slug[0]; // Get the first category if it exists
        url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/products?filters[category][$equals]=${category}`;
        // url = `${ENDPOINT.BASE_URL}/api/products?filters[category][$equals]=${category}`;
      } else {
        // If no category is provided, use a default API call (e.g., fetching all products)
        url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/products`;
        // url = `${ENDPOINT.BASE_URL}/api/products`;
      }
    
      // Fetch the data from the API
      fetch(url)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setProducts(data); // Set the fetched data to state
        })
        .catch((error) => {
          console.error("Error fetching data:", error); // Handle errors
        });
    }, [slug]); // Add slug as a dependency to re-run when it changes
    

//   // getting all data from URL slug and preparing everything for sending GET request
//   const inStockNum = slug?.searchParams?.inStock === "true" ? 1 : 0;
//   const outOfStockNum = slug?.searchParams?.outOfStock === "true" ? 1 : 0;
//   const page = slug?.searchParams?.page ? Number(slug?.searchParams?.page) : 1;

//   let stockMode: string = "lte";

//   // preparing inStock and out of stock filter for GET request
//   // If in stock checkbox is checked, stockMode is "equals"
//   if (inStockNum === 1) {
//     stockMode = "equals";
//   }
//   // If out of stock checkbox is checked, stockMode is "lt"
//   if (outOfStockNum === 1) {
//     stockMode = "lt";
//   }
//   // If in stock and out of stock checkboxes are checked, stockMode is "lte"
//   if (inStockNum === 1 && outOfStockNum === 1) {
//     stockMode = "lte";
//   }
//   // If in stock and out of stock checkboxes aren't checked, stockMode is "gt"
//   if (inStockNum === 0 && outOfStockNum === 0) {
//     stockMode = "gt";
//   }
// // 19 oct for testing
//   // const url = `${ENDPOINT.BASE_URL}/api/products?filters[price][$lte]=${
//   //   slug?.searchParams?.price || 3000
//   // }&filters[rating][$gte]=${
//   //   Number(slug?.searchParams?.rating) || 0
//   // }&filters[inStock][$${stockMode}]=1&${
//   //   slug?.params?.slug?.length > 0
//   //     ? `filters[category][$equals]=${slug?.params?.slug}&`
//   //     : ""
//   // }sort=${slug?.searchParams?.sort}&page=${page}`;


//   // sending API request with filtering, sorting and pagination for getting all products
//   // const data =  fetch(url);
//   console.log("naziya ********abcd*********url=", url);
//   console.log("naziya ***********1234$******data=", data);

//   // const products = await data.json();
//   console.log("*****************products component", products);
//   /*
//     const req = await fetch(
//     `http://localhost:1337/api/products?populate=*&filters[price][$lte]=${
//       searchParams?.price || 1000
//     }${searchParams.women === "true" ? "&filters[category][$eq]=women" : ""}${searchParams.womenNewEdition === "true" ? "&filters[category][$eq]=women%20new%20edition" : ""}&filters[rating][$gte]=${
//       searchParams?.rating || 1
//     }`
//   );
//   const products = await req.json();
  // */
  return (
    <div className="grid grid-cols-3 justify-items-center gap-x-2 gap-y-5 max-[1300px]:grid-cols-3 max-lg:grid-cols-2 max-[500px]:grid-cols-1">
      {products.length > 0 ? (
        products.map((product: Product) => (
          <ProductItem key={product.id} product={product} color="black" />
        ))
      ) : (
        <h3 className="text-3xl mt-5 text-center w-full col-span-full max-[1000px]:text-2xl max-[500px]:text-lg">
          No products found for specified query..
        </h3>
      )}
    </div>
  );
};

export default Products;
