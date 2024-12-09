"use client"
import {
  StockAvailabillity,
  UrgencyText,
  SingleProductRating,
  ProductTabs,
  SingleProductDynamicFields,
  AddToWishlistBtn,
} from "@/components";
import Image from "next/image";
import { notFound } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaSquareFacebook, FaSquareXTwitter, FaSquarePinterest, FaSquareWhatsapp } from "react-icons/fa6";
import ENDPOINT from '@/config/appConfig';

interface ImageItem {
  imageID: string;
  productID: string;
  image: string;
}

const fetchProductData = async (productSlug: string) => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/slugs/${productSlug}`);
  // const data = await fetch(`${ENDPOINT.BASE_URL}/api/slugs/${productSlug}`);
  const product = await data.json();

  const imagesData = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/images/${product.id}`);
  // const imagesData = await fetch(`${ENDPOINT.BASE_URL}/api/images/${product.id}`);
  const images = await imagesData.json();

  return { product, images };
};

const SingleProductPage = ({ params }: SingleProductPageProps) => {
  const [product, setProduct] = useState<any>(null);
  const [images, setImages] = useState<ImageItem[]>([]);
  const [mainImage, setMainImage] = useState<string>("");

  const shareUrl = encodeURIComponent("https://myzk.in/product/"); // Replace with the URL you want to share
  const message = encodeURIComponent("Check this out: "); // Add a message if desired
  const whatsappLink = `https://api.whatsapp.com/send?text=${message}${shareUrl}`;

  


  useEffect(() => {
    const loadData = async () => {
      const { product, images } = await fetchProductData(params.productSlug);

      if (!product || product.error) {
        notFound();
      } else {
        setProduct(product);
        setImages(images);
        setMainImage(product.mainImage ? `/${product.mainImage}` : "/product_placeholder.jpg");
      }
    };

    loadData();
  }, [params.productSlug]);

  const handleImageHover = (imageSrc: string) => {
    setMainImage(imageSrc);
  };

  return (
    <div className="bg-white">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex justify-center gap-x-4 pt-10 max-lg:flex-col items-center gap-y-5 px-5">
          
          {/* Left side: Alternate Images */}
          <div className="flex flex-col gap-y-2">
            {product?.alternateImage1 && (
              <Image
                src={`/${product.alternateImage1}`}
                width={100}
                height={100}
                alt="alternate image 1"
                className="w-auto h-auto border border-gray-300 shadow-sm hover:shadow-lg hover:scale-105 transition-transform duration-200 cursor-pointer"
                onMouseEnter={() => handleImageHover(`/${product.alternateImage1}`)}
                onMouseLeave={() => setMainImage(product.mainImage ? `/${product.mainImage}` : "/product_placeholder.jpg")}
              />
            )}
            {product?.alternateImage2 && (
              <Image
                src={`/${product.alternateImage2}`}
                width={100}
                height={100}
                alt="alternate image 2"
                className="w-auto h-auto border border-gray-300 shadow-sm hover:shadow-lg hover:scale-105 transition-transform duration-200 cursor-pointer"
                onMouseEnter={() => handleImageHover(`/${product.alternateImage2}`)}
                onMouseLeave={() => setMainImage(product.mainImage ? `/${product.mainImage}` : "/product_placeholder.jpg")}
              />
            )}
            {product?.alternateImage3 && (
              <Image
                src={`/${product.alternateImage3}`}
                width={100}
                height={100}
                alt="alternate image 3"
                className="w-auto h-auto border border-gray-300 shadow-sm hover:shadow-lg hover:scale-105 transition-transform duration-200 cursor-pointer"
                onMouseEnter={() => handleImageHover(`/${product.alternateImage3}`)}
                onMouseLeave={() => setMainImage(product.mainImage ? `/${product.mainImage}` : "/product_placeholder.jpg")}
              />
            )}
            {product?.alternateImage4 && (
              <Image
                src={`/${product.alternateImage4}`}
                width={100}
                height={100}
                alt="alternate image 4"
                className="w-auto h-auto border border-gray-300 shadow-sm hover:shadow-lg hover:scale-105 transition-transform duration-200 cursor-pointer"
                onMouseEnter={() => handleImageHover(`/${product.alternateImage4}`)}
                onMouseLeave={() => setMainImage(product.mainImage ? `/${product.mainImage}` : "/product_placeholder.jpg")}
              />
            )}
          </div>

          {/* Main Image and Additional Content */}
          <div>
            <Image
              src={mainImage}
              width={500}
              height={500}
              alt="main image"
              className="w-auto h-auto"
            />
            
            {/* Thumbnail Images (Existing Mapping) */}
            <div className="flex justify-around mt-0 flex-wrap gap-y-1 max-[500px]:justify-center max-[500px]:gap-x-1">
              {images?.map((imageItem: ImageItem) => (
                <Image
                  key={imageItem.imageID}
                  src={`/${imageItem.image}`}
                  width={100}
                  height={100}
                  alt="not found"
                  className="w-auto h-auto"
                  onMouseEnter={() => handleImageHover(`/${imageItem.image}`)}
                  onMouseLeave={() => setMainImage(product.mainImage ? `/${product.mainImage}` : "/product_placeholder.jpg")}
                />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col gap-y-7 text-black max-[500px]:text-center px-5">
            {/* <SingleProductRating rating={product?.rating} /> */}
            <h1 className="text-3xl">{product?.title}</h1>
            <p className="text-xl font-semibold line-through">₹{product?.price}</p>
            <p className="text-xl font-semibold">₹{product?.salePrice}</p>
            <StockAvailabillity stock={94} inStock={product?.inStock} />
            <SingleProductDynamicFields product={product} />
            
            {/* Wishlist and SKU, Social Media, Payment Icons */}
            <div className="flex flex-col gap-y-2 max-[500px]:items-center">
              <AddToWishlistBtn product={product} slug={params.productSlug} />
              <p className="text-lg">
                SKU: <span className="ml-1">abccd-18</span>
              </p>
              <div className="text-lg flex gap-x-2">
                <span>Share:</span>
                {/* <div className="flex items-center gap-x-1 text-2xl">
                   <FaSquareFacebook />
                  <FaSquareXTwitter />
                  <FaSquarePinterest /> 
                  <FaSquareWhatsapp />
                </div> */}
            <div className="flex items-center gap-x-1 text-2xl">
      <a href={`${whatsappLink}${params.productSlug}`} target="_blank" rel="noopener noreferrer">
        <FaSquareWhatsapp />
      </a>
    </div>
              </div>
              <div className="flex gap-x-2">
                <Image src="/visa.svg" width={50} height={50} alt="visa icon" className="w-auto h-auto" />
                <Image src="/mastercard.svg" width={50} height={50} alt="mastercard icon" className="h-auto w-auto" />
                <Image src="/ae.svg" width={50} height={50} alt="american express icon" className="h-auto w-auto" />
                <Image src="/paypal.svg" width={50} height={50} alt="paypal icon" className="w-auto h-auto" />
                <Image src="/dinersclub.svg" width={50} height={50} alt="diners club icon" className="h-auto w-auto" />
                <Image src="/discover.svg" width={50} height={50} alt="discover icon" className="h-auto w-auto" />
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="py-16">
          <ProductTabs product={product} />
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;
