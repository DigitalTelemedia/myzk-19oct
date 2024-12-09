// *********************
// Role of the component: Wishlist item component for wishlist page
// Name of the component: WishItem.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <WishItem id={id} title={title} price={price} image={image} slug={slug} stockAvailabillity={stockAvailabillity} />
// Input parameters: ProductInWishlist interface
// Output: single wishlist item on the wishlist page
// *********************

"use client";
import { useWishlistStore } from "@/app/_zustand/wishlistStore";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaHeartCrack } from "react-icons/fa6";
import { deleteWishItem } from "@/app/actions";
import { useSession } from "next-auth/react";
// import ENDPOINT from "../config/appConfig";
import ENDPOINT from '@/config/appConfig';
import { useProductStore } from "@/app/_zustand/store";

interface wishItemStateTrackers {
  isWishItemDeleted: boolean;
  setIsWishItemDeleted: any;
}

const WishItem = ({
  id,
  title,
  price,
  salePrice,
  image,
  slug,
  stockAvailabillity,
}: ProductInWishlist) => {
  const { addToCart, calculateTotals } = useProductStore();
  const { data: session, status } = useSession();
  const { removeFromWishlist } = useWishlistStore();
  const router = useRouter();
  const [userId, setUserId] = useState<string>();
  
  const openProduct = (slug: string): void => {
    router.push(`/product/${slug}`);
  };

  const getUserByEmail = async () => {
    if (session?.user?.email) {
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/email/${session?.user?.email}`, {
      // fetch(`${ENDPOINT.BASE_URL}/api/users/email/${session?.user?.email}`, {
        cache: "no-store",
      })
        .then((response) => response.json())
        .then((data) => {
          setUserId(data?.id);
        });
    }
  };

  const deleteItemFromWishlist = async (productId: string) => {
    if (userId) {
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist/${userId}/${productId}`, {
      // fetch(`${ENDPOINT.BASE_URL}/api/wishlist/${userId}/${productId}`, {
        method: "DELETE",
      }).then((response) => {
        removeFromWishlist(productId);
        toast.success("Item removed from your wishlist");
      });
    } else {
      toast.error("You need to be logged in to perform this action");
    }
  };

  useEffect(() => {
    getUserByEmail();
  }, [session?.user?.email]);


  const handleAddToCart = () => {
    addToCart({
      id: id.toString(),
      title: title,
      price: price,
      salePrice: salePrice,
      image: image,
      amount: 1,
    });
    calculateTotals();
    toast.success("Product added to the cart");
    router.push("/checkout");
  };

  return (
    <tr className="hover:bg-gray-100 cursor-pointer">
      <th
        className="text-black text-sm text-center"
        onClick={() => openProduct(slug)}
      >
        {id}
      </th>
      <th>
        <div className="w-12 h-12 mx-auto" onClick={() => openProduct(slug)}>
          <Image
            src={`/${image}`}
            width={200}
            height={200}
            className="w-auto h-auto"
            alt={title}
          />
        </div>
      </th>
      <td
        className="text-black text-sm text-center"
        onClick={() => openProduct(slug)}
      >
        {title}
      </td>
      <td
        className="text-black text-sm text-center"
        onClick={() => openProduct(slug)}
      >
        {stockAvailabillity ? (
          <span className="text-success">In stock</span>
        ) : (
          <span className="text-error">Out of stock</span>
        )}
      </td>
      <td>
        <button className="btn btn-xs bg-black text-white hover:text-orange-500 border border-blue-500 hover:bg-white hover:text-orange-500 text-sm">
          <FaHeartCrack />
          <span
            className="max-sm:hidden"
            onClick={() => deleteItemFromWishlist(id)}
          >
            remove from the wishlist
          </span>
        </button>
        <button 
        onClick={handleAddToCart}
        className=" m-2 border  btn border-gray-300  bg-white text-black hover:bg-orange-600 hover:text-white hover:border-orange-900 hover:scale-110 transition-all uppercase ease-in">
          Buy Now
        </button>
          
      </td>
    </tr>
  );
};

export default WishItem;
