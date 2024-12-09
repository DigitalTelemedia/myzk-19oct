"use client";
import { DashboardSidebar } from "@/components";
import { convertCategoryNameToURLFriendly as convertSlugToURLFriendly } from "@/utils/categoryFormating";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import ENDPOINT from "@/config/appConfig";

const AddNewProduct = () => {
  const [product, setProduct] = useState<{
    title: string;
    price: number;
    salePrice: number;
    manufacturer: string;
    inStock: number;
    mainImage: string;
    alternateImage1:string,
    alternateImage2:string,
    alternateImage3:string,
    alternateImage4:string,
    description: string;
    slug: string;
    categoryId: string;
  }>({
    title: "",
    price: 0,
    salePrice: 0,
    manufacturer: "",
    inStock: 1,
    mainImage: "",
    alternateImage1:"",
    alternateImage2:"",
    alternateImage3:"",
    alternateImage4:"",
    description: "",
    slug: "",
    categoryId: "",
  });
  const [categories, setCategories] = useState<Category[]>([]);

  const addProduct = async () => {
    if (
      product.title === "" ||
      product.manufacturer === "" ||
      product.description == "" ||
      product.slug === ""
    ) {
      toast.error("Please enter values in input fields");
      return;
    }

    const requestOptions: any = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    };
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, requestOptions)
    // fetch(`${ENDPOINT.BASE_URL}/api/products`, requestOptions)
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else {
          throw Error("There was an error while creating product");
        }
      })
      .then((data) => {
        toast.success("Product added successfully");
        setProduct({
          title: "",
          price: 0,
          salePrice: 0,
          manufacturer: "",
          inStock: 1,
          mainImage: "",
          alternateImage1:"",
          alternateImage2:"",
          alternateImage3:"",
          alternateImage4:"",
          description: "",
          slug: "",
          categoryId: "",
        });
      })
      .catch((error) => {
        toast.error("There was an error while creating product");
      });
  };

  const uploadFile = async (file: any) => {
    const formData = new FormData();
    formData.append("uploadedFile", file);

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/main-image", {
      // const response = await fetch(ENDPOINT.BASE_URL + "/api/main-image", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
      } else {
        console.error("File upload unsuccessfull");
      }
    } catch (error) {
      console.error("Error happend while sending request:", error);
    }
  };

  const fetchCategories = async () => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`)
    // fetch(`${ENDPOINT.BASE_URL}/api/categories`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCategories(data);
        setProduct({
          title: "",
          price: 0,
          salePrice: 0,
          manufacturer: "",
          inStock: 1,
          mainImage: "",
          alternateImage1:"",
          alternateImage2:"",
          alternateImage3:"",
          alternateImage4:"",
          description: "",
          slug: "",
          categoryId: data[0]?.id,
        });
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Helper function to convert text to a slug format
const convertToSlug = (text: string) => {
  return text.toLowerCase().replace(/\s+/g, "-");
};



  const handleTitleChange = (e:any) => {
    const title = e.target.value;
    const slug = convertToSlug(title);
    setProduct({ ...product, title, slug });
  };
  return (
    <div className="bg-white flex justify-start max-w-screen-2xl mx-auto xl:h-full max-xl:flex-col max-xl:gap-y-5">
      <DashboardSidebar />
      <div className="flex flex-col gap-y-7 xl:ml-5 max-xl:px-5 w-full">
        <h1 className="text-3xl font-semibold">Add new product</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Name */}
          {/* <div className="form-control md:w-1/2">
            <label className="label">
              <span className="label-text">Product name:</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={product?.title}
              onChange={(e) => setProduct({ ...product, title: e.target.value })}
            />
          </div> */}
               <div className="form-control md:w-1/2">
        <label className="label">
          <span className="label-text">Product name:</span>
        </label>
        <input
          type="text"
          className="input input-bordered w-full"
          value={product.title}
          onChange={handleTitleChange}
          placeholder="Product Name"
        />
      </div>

          {/* Product Slug */}
          {/* <div className="form-control md:w-1/2">
            <label className="label">
              <span className="label-text">Product slug:</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={convertSlugToURLFriendly(product?.slug)}
              onChange={(e) =>
                setProduct({
                  ...product,
                  slug: convertSlugToURLFriendly(e.target.value),
                })
              }
            />
          </div> */}
             <div className="form-control md:w-1/2">
        <label className="label">
          <span className="label-text">Product slug:</span>
        </label>
        <input
          type="text"
          className="input input-bordered w-full"
          value={product.slug}
          placeholder="product-slug"
          readOnly
        />
      </div>

          {/* Category */}
          <div className="form-control md:w-1/2">
            <label className="label">
              <span className="label-text">Category:</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={product?.categoryId}
              onChange={(e) => setProduct({ ...product, categoryId: e.target.value })}
            >
              {categories &&
                categories.map((category: any) => (
                  <option key={category?.id} value={category?.id}>
                    {category?.name}
                  </option>
                ))}
            </select>
          </div>




          {/* Main Image */}
          <div className="md:w-1/2">
            <label htmlFor="file-upload" className="block mb-2 text-sm font-medium text-gray-700">
              Main Image
            </label>
            <input
              type="file"
              className="file-input file-input-bordered w-full"
              onChange={(e: any) => {
                uploadFile(e.target.files[0]);
                setProduct({ ...product, mainImage: e.target.files[0].name });
              }}
            />
            {product?.mainImage && (
              <Image
                src={`/` + product?.mainImage}
                alt={product?.title}
                className="w-auto h-auto"
                width={20}
                height={20}
              />
            )}
          </div>
          {/* Sale Price */}
          <div className="form-control md:w-1/2">
            <label className="label">
              <span className="label-text">Product Sale price:</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={product?.salePrice}
              onChange={(e) =>
                setProduct({ ...product, salePrice: Number(e.target.value) })
              }
            />
          </div>
          {/* Alt Image */}
          <div className="md:w-1/2">
            <label htmlFor="file-upload" className="block mb-2 text-sm font-medium text-gray-700">
              alternate Image
            </label>
            <input
              type="file"
              className="file-input file-input-bordered w-full"
              onChange={(e: any) => {
                uploadFile(e.target.files[0]);
                setProduct({ ...product, alternateImage1: e.target.files[0].name });
              }}
            />
            {product?.alternateImage1 && (
              <Image
                src={`/` + product?.alternateImage1}
                alt={product?.title}
                className="w-auto h-auto"
                width={20}
                height={20}
              />
            )}
          </div>
          {/* Manufacturer */}
          <div className="form-control md:w-1/2">
            <label className="label">
              <span className="label-text">Manufacturer:</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={product?.manufacturer}
              onChange={(e) =>
                setProduct({ ...product, manufacturer: e.target.value })
              }
            />
          </div>

          <div className="md:w-1/2">
            <label htmlFor="file-upload" className="block mb-2 text-sm font-medium text-gray-700">
              alternate Image
            </label>
            <input
              type="file"
              className="file-input file-input-bordered w-full"
              onChange={(e: any) => {
                uploadFile(e.target.files[0]);
                setProduct({ ...product, alternateImage2: e.target.files[0].name });
              }}
            />
            {product?.alternateImage2 && (
              <Image
                src={`/` + product?.alternateImage2}
                alt={product?.title}
                className="w-auto h-auto"
                width={20}
                height={20}
              />
            )}
          </div>

          {/* In Stock */}
          <div className="form-control md:w-1/2">
            <label className="label">
              <span className="label-text">Is product in stock?</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={product?.inStock}
              onChange={(e) =>
                setProduct({ ...product, inStock: Number(e.target.value) })
              }
            >
              <option value={1}>Yes</option>
              <option value={0}>No</option>
            </select>
          </div>

          <div className="md:w-1/2">
            <label htmlFor="file-upload" className="block mb-2 text-sm font-medium text-gray-700">
              alternate Image
            </label>
            <input
              type="file"
              className="file-input file-input-bordered w-full"
              onChange={(e: any) => {
                uploadFile(e.target.files[0]);
                setProduct({ ...product, alternateImage3: e.target.files[0].name });
              }}
            />
            {product?.alternateImage3 && (
              <Image
                src={`/`+ product?.alternateImage3}
                alt={product?.title}
                className="w-auto h-auto"
                width={20}
                height={20}
              />
            )}
          </div>
          {/* Product Price */}
          <div className="form-control md:w-1/2">
            <label className="label">
              <span className="label-text">Product price:</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={product?.price}
              onChange={(e) =>
                setProduct({ ...product, price: Number(e.target.value) })
              }
            />
          </div>



          <div className="md:w-1/2">
            <label htmlFor="file-upload" className="block mb-2 text-sm font-medium text-gray-700">
              alternate Image
            </label>
            <input
              type="file"
              className="file-input file-input-bordered w-full"
              onChange={(e: any) => {
                uploadFile(e.target.files[0]);
                setProduct({ ...product, alternateImage4: e.target.files[0].name });
              }}
            />
            {product?.alternateImage4 && (
              <Image
                src={`/` + product?.alternateImage4}
                alt={product?.title}
                className="w-auto h-auto"
                width={20}
                height={20}
              />
            )}
          </div>





        </div>
        {/* Product Description */}
        <div className="col-span-1 md:col-span-2 pr-4">
          <label className="label">
            <span className="label-text">Product description:</span>
          </label>
          <textarea
            className="textarea textarea-bordered w-full h-24"
            value={product?.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
          ></textarea>
        </div>


        {/* Add Product Button */}
        <div className="flex gap-x-2">
          <button
            onClick={addProduct}
            type="button"
            className="uppercase bg-black px-10 py-5 text-lg border border-black border-gray-300 font-bold text-white shadow-sm hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2"
          >
            Add product
          </button>
        </div>
      </div>

    </div>
  );
  // return (
  //   <div className="bg-white flex justify-start max-w-screen-2xl mx-auto xl:h-full max-xl:flex-col max-xl:gap-y-5">
  //     <DashboardSidebar />
  //     <div className="flex flex-col gap-y-7 xl:ml-5 max-xl:px-5 w-full">
  //       <h1 className="text-3xl font-semibold">Add new product</h1>
  //       <div>
  //         <label className="form-control w-full max-w-xs">
  //           <div className="label">
  //             <span className="label-text">Product name:</span>
  //           </div>
  //           <input
  //             type="text"
  //             className="input input-bordered w-full max-w-xs"
  //             value={product?.title}
  //             onChange={(e) =>
  //               setProduct({ ...product, title: e.target.value })
  //             }
  //           />
  //         </label>
  //       </div>

  //       <div>
  //         <label className="form-control w-full max-w-xs">
  //           <div className="label">
  //             <span className="label-text">Product slug:</span>
  //           </div>
  //           <input
  //             type="text"
  //             className="input input-bordered w-full max-w-xs"
  //             value={convertSlugToURLFriendly(product?.slug)}
  //             onChange={(e) =>
  //               setProduct({
  //                 ...product,
  //                 slug: convertSlugToURLFriendly(e.target.value),
  //               })
  //             }
  //           />
  //         </label>
  //       </div>

  //       <div>
  //         <label className="form-control w-full max-w-xs">
  //           <div className="label">
  //             <span className="label-text">Category:</span>
  //           </div>
  //           <select
  //             className="select select-bordered"
  //             value={product?.categoryId}
  //             onChange={(e) =>
  //               setProduct({ ...product, categoryId: e.target.value })
  //             }
  //           >
  //             {categories &&
  //               categories.map((category: any) => (
  //                 <option key={category?.id} value={category?.id}>
  //                   {category?.name}
  //                 </option>
  //               ))}
  //           </select>
  //         </label>
  //       </div>

  //       <div>
  //         <label className="form-control w-full max-w-xs">
  //           <div className="label">
  //             <span className="label-text">Product price:</span>
  //           </div>
  //           <input
  //             type="text"
  //             className="input input-bordered w-full max-w-xs"
  //             value={product?.price}
  //             onChange={(e) =>
  //               setProduct({ ...product, price: Number(e.target.value) })
  //             }
  //           />
  //         </label>
  //       </div>
  //       <div>
  //         <label className="form-control w-full max-w-xs">
  //           <div className="label">
  //             <span className="label-text">Product Sale price:</span>
  //           </div>
  //           <input
  //             type="text"
  //             className="input input-bordered w-full max-w-xs"
  //             value={product?.salePrice}
  //             onChange={(e) =>
  //               setProduct({ ...product, salePrice: Number(e.target.value) })
  //             }
  //           />
  //         </label>
  //       </div>
  //       <div>
  //         <label className="form-control w-full max-w-xs">
  //           <div className="label">
  //             <span className="label-text">Manufacturer:</span>
  //           </div>
  //           <input
  //             type="text"
  //             className="input input-bordered w-full max-w-xs"
  //             value={product?.manufacturer}
  //             onChange={(e) =>
  //               setProduct({ ...product, manufacturer: e.target.value })
  //             }
  //           />
  //         </label>
  //       </div>
  //       <div>
  //         <label className="form-control w-full max-w-xs">
  //           <div className="label">
  //             <span className="label-text">Is product in stock?</span>
  //           </div>
  //           <select
  //             className="select select-bordered"
  //             value={product?.inStock}
  //             onChange={(e) =>
  //               setProduct({ ...product, inStock: Number(e.target.value) })
  //             }
  //           >
  //             <option value={1}>Yes</option>
  //             <option value={0}>No</option>
  //           </select>
  //         </label>
  //       </div>
  //       <div>
  //         <input
  //           type="file"
  //           className="file-input file-input-bordered file-input-lg w-full max-w-sm"
  //           onChange={(e: any) => {
  //             uploadFile(e.target.files[0]);
  //             setProduct({ ...product, mainImage: e.target.files[0].name });
  //           }}
  //         />
  //         {product?.mainImage && (
  //           <Image
  //             src={`/` + product?.mainImage}
  //             alt={product?.title}
  //             className="w-auto h-auto"
  //             width={100}
  //             height={100}
  //           />
  //         )}
  //       </div>
  //       <div>
  //         <label className="form-control">
  //           <div className="label">
  //             <span className="label-text">Product description:</span>
  //           </div>
  //           <textarea
  //             className="textarea textarea-bordered h-24"
  //             value={product?.description}
  //             onChange={(e) =>
  //               setProduct({ ...product, description: e.target.value })
  //             }
  //           ></textarea>
  //         </label>
  //       </div>
  //       <div className="flex gap-x-2">
  //         <button
  //           onClick={addProduct}
  //           type="button"
  //           className="uppercase bg-black px-10 py-5 text-lg border border-black border-gray-300 font-bold text-white shadow-sm hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2"
  //         >
  //           Add product
  //         </button>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default AddNewProduct;
