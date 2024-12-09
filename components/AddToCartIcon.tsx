
"use client";

import React from "react";
import { useProductStore } from "@/app/_zustand/store";
import toast from "react-hot-toast";
import { ShoppingCart } from "@mui/icons-material";

const AddToCartIcon = ({
  product,
  quantityCount,
}: SingleProductBtnProps) => {
  const { addToCart, calculateTotals } = useProductStore();

  const handleAddToCart = () => {
    addToCart({
      id: product?.id.toString(),
      title: product?.title,
      price: product?.price,
      salePrice: product?.salePrice,
      image: product?.mainImage,
      amount: quantityCount,
    });
    calculateTotals();
    toast.success("Product added to the cart");
  };
  return (
    <>
     <ShoppingCart  onClick={handleAddToCart} />
    {/* <button
      onClick={handleAddToCart}
      // className="btn w-[200px] text-lg border border-gray-300 border-1 font-normal bg-white text-orange-500 hover:bg-black hover:text-white hover:border-blue-500 hover:scale-110 transition-all uppercase ease-in max-[500px]:w-full"
      
      className="btn w-[200px] text-lg border border-gray-300 border-1 font-normal bg-white text-black hover:bg-orange-600 hover:text-white hover:border-orange-900 hover:scale-110 transition-all uppercase ease-in max-[500px]:w-full">
      {" "}
      Add to cart
    </button> */}
          </>
  );
};

export default AddToCartIcon;
