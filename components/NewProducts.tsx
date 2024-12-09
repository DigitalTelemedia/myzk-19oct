'use client'
// *********************
// Role of the component: Showing products on the shop page with applied filter and sort
// Name of the component: Products.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <Products slug={slug} />
// Input parameters: { slug }: any
// Output: products grid
// *********************
import React, { useEffect, useState } from 'react'
import ProductItem from './ProductItem'
// import ENDPOINT from "../config/appConfig";
import ENDPOINT from '@/config/appConfig'

import Heading from './Heading'
const NewProducts = ({ props }: any) => {
  const [products, setProducts] = useState([])
  const fetchEvents = () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/products?filters[category][$equals]=${props.name}`
      // const url = `${ENDPOINT.BASE_URL}/api/products?filters[category][$equals]=tablets&sort=defaultSort&page=1`;

      // const url = `${ENDPOINT.BASE_URL}/api/products?filters[category][$equals]=${
      //   slug?.searchParams?.price || 3000
      // }&filters[rating][$gte]=${
      //   Number(slug?.searchParams?.rating) || 0
      // }&filters[inStock][$${stockMode}]=1&${
      //   slug?.params?.slug?.length > 0
      //     ? `filters[category][$equals]=${slug?.params?.slug}&`
      //     : ""
      // }sort=${slug?.searchParams?.sort}&page=${page}`;

      // sending API request with filtering, sorting and pagination for getting all products

      // const data = fetch(url);
      //     const products = await  data.json()
      fetch(url)
        .then(res => {
          return res.json()
        })
        .then(data => {
          setProducts(data)
        })
      // console.log("data,,,,,,", data);
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  // getting all data from URL slug and preparing everything for sending GET request
  // const inStockNum = slug?.searchParams?.inStock === "true" ? 1 : 0;
  // const outOfStockNum = slug?.searchParams?.outOfStock === "true" ? 1 : 0;
  // const page = slug?.searchParams?.page ? Number(slug?.searchParams?.page) : 1;

  // let stockMode: string = "lte";
  // // preparing inStock and out of stock filter for GET request
  // // If in stock checkbox is checked, stockMode is "equals"
  // if (inStockNum === 1) {
  //   stockMode = "equals";
  // }
  // // If out of stock checkbox is checked, stockMode is "lt"
  // if (outOfStockNum === 1) {
  //   stockMode = "lt";
  // }
  // // If in stock and out of stock checkboxes are checked, stockMode is "lte"
  // if (inStockNum === 1 && outOfStockNum === 1) {
  //   stockMode = "lte";
  // }
  // // If in stock and out of stock checkboxes aren't checked, stockMode is "gt"
  // if (inStockNum === 0 && outOfStockNum === 0) {
  //   stockMode = "gt";
  // }

  // const url = `${ENDPOINT.BASE_URL}/api/products?filters[price][$lte]=${
  //   slug?.searchParams?.price || 3000
  // }&filters[rating][$gte]=${
  //   Number(slug?.searchParams?.rating) || 0
  // }&filters[inStock][$${stockMode}]=1&${
  //   slug?.params?.slug?.length > 0
  //     ? `filters[category][$equals]=${slug?.params?.slug}&`
  //     : ""
  // }sort=${slug?.searchParams?.sort}&page=${page}`;

  // // sending API request with filtering, sorting and pagination for getting all products
  // const data = await fetch(url);
  // console.log("naziya *****************url=", url);
  // console.log("naziya *****************data=", data);

  // const products = await data.json();
  // console.log("*****************products component", products);
  // /*
  //   const req = await fetch(
  //   `http://localhost:1337/api/products?populate=*&filters[price][$lte]=${
  //     searchParams?.price || 1000
  //   }${searchParams.women === "true" ? "&filters[category][$eq]=women" : ""}${searchParams.womenNewEdition === "true" ? "&filters[category][$eq]=women%20new%20edition" : ""}&filters[rating][$gte]=${
  //     searchParams?.rating || 1
  //   }`
  // );
  // const products = await req.json();
  // */
  return (
    // <>
    //   <Heading title="New Products" />

    // <div className="grid grid-cols-3 justify-items-center gap-x-2 gap-y-5 max-[1300px]:grid-cols-3 max-lg:grid-cols-2 max-[500px]:grid-cols-1">

    //   {products.length > 0 ? (
    //     products.map((product: Product) => (
    //       <ProductItem key={product.id} product={product} color="black" />
    //     ))
    //   )
    //   : (
    //     <h3 className="text-3xl mt-5 text-center w-full col-span-full max-[1000px]:text-2xl max-[500px]:text-lg">
    //       No products found for specified query
    //     </h3>
    //   )}
    // </div>
    // </>

    <div className='bg-white border-t-4 border-white'>
      <div className='max-w-screen-2xl mx-auto pt-5'>
        <Heading title='NEW PRODUCTS' />
        <div className='grid grid-cols-4 justify-items-center max-w-screen-xl mx-auto py-10 gap-x-5 px-16 gap-y-8 max-md:grid-cols-2 max-sm:grid-cols-1'>
          {products.map((product: Product) => (
            <ProductItem key={product.id} product={product} color='white' />
          ))}
        </div>
      </div>
    </div>
  )
}

export default NewProducts
