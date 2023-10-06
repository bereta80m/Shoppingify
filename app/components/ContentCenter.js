"use client";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import useProductsHook from "../customHooks/useProductsHook";
import Dialog from "../context/Dialog";
import { Quicksand } from "next/font/google";
const QuickFont = Quicksand({ subsets: ["latin"], weight: ["600"] });
import { GrAdd } from "react-icons/gr";
import { IoMdAdd } from "react-icons/io";
import { UseGlobal } from "../context/GlobalContext";
import ItemsCart from "@/ItemsCart";
import { motion } from "framer-motion";
import DialogConfirm from "../context/DialogConfirm";

function ContentCenter() {
  const { HandleAddItem, state, allProducts, setSelectedProduct,searchValue } = UseGlobal();
  
  const groupProductsByCategory = () => {

    return allProducts?.products?.reduce((grouped, product) => {
      const category = product.category;
      if (searchValue.toLowerCase() && !product.name.toLowerCase().includes(searchValue.toLowerCase())) {
        return grouped;
      }

      if (!grouped[category]) {
        grouped[category] = [];
      }

      grouped[category].push(product);

      return grouped;
    }, {});
  };

  const groupedProducts = groupProductsByCategory();



  return (
    <div className={`${QuickFont.className} relative  max-w-screen-lg  mx-auto p-4 break-all bg-[#fafafe]`}>

      {groupedProducts &&
        Object.keys(groupedProducts).map((category,index) => (
          <div key={index} className="flex flex-col  w-full lg:px-20 md:px-12 sm:px-9 xs:px-6 xxs:px-3 ">
            <h1 className="text-xl font-semibold py-5">{category === "fruit" ? 'Fruit and vegetables' : category.charAt(0).toUpperCase() + category.slice(1)}</h1>
            <ul className="grid  lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 xxs:grid-cols-1 gap-5">
              {groupedProducts[category].map((product, index) => (
                <li className="group flex cursor-pointer items-center truncate justify-between px-4 gap-3 bg-white   shadow-md rounded-xl" key={index}>
                  <motion.button onClick={()=>setSelectedProduct(product)}  className="py-4 ">
                    {product.name}
                  </motion.button>
                  <motion.button onClick={()=>HandleAddItem(product)} className="group-hover:scale-150 ">
                    <IoMdAdd className="text-gray-400 text-2xl " />
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>
        ))}

      <Dialog />
    </div>
  );
}

export default ContentCenter;

/*
  const CategoriasCollections = (category)=>{
    const FilterProducts = allProducts?.products?.filter((product) => {
      const allowedCategories = [category]
      return allowedCategories.includes(product.category)
    })
    return FilterProducts 
  }

      <div className='flex flex-col gap-5   w-full px-20 '>
        <h1 className='text-xl font-semibold'>Fruit and vegetables</h1>
        <ul className='grid  lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 xxs:grid-cols-1 gap-5'>
          {allProducts && CategoriasCollections("fruit")?.map((product, index) => (
            <li className='group flex cursor-pointer items-center truncate justify-between px-4 gap-3 bg-white   shadow-md rounded-xl' key={index}>
               <motion.button onClick={()=>setSelectedProduct(product)} className=' py-4 '>{product.name}</motion.button>
              <motion.button onClick={()=>HandleAddItem(product)} className='group-hover:scale-150 ' >
              <IoMdAdd className="text-gray-400 text-2xl " />
              </motion.button>
            </li>
          ))}
        </ul>

        <h1 className='text-xl font-semibold'>Beverages</h1>
        <ul className='grid  lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 xxs:grid-cols-1 gap-5'>
          {allProducts && CategoriasCollections("beverages")?.map((product, index) => (
       <li className='group flex cursor-pointer items-center truncate justify-between px-4 gap-3 bg-white   shadow-md rounded-xl' key={index}>
       <motion.button onClick={()=>setSelectedProduct(product)} className=' py-4 '>{product.name}</motion.button>
      <motion.button onClick={()=>HandleAddItem(product)} className='group-hover:scale-150 ' >
      <IoMdAdd className="text-gray-400 text-2xl " />
      </motion.button>
    </li>
          ))}
        </ul>
        <h1 className='text-xl font-semibold'>Meat and Fish</h1>
        <ul className='grid  lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 xxs:grid-cols-1 gap-5'>
          {allProducts && CategoriasCollections("meat and fish")?.map((product, index) => (
       <li className='group flex cursor-pointer items-center truncate justify-between px-4 gap-3 bg-white   shadow-md rounded-xl' key={index}>
       <motion.button onClick={()=>setSelectedProduct(product)} className=' py-4 '>{product.name}</motion.button>
      <motion.button onClick={()=>HandleAddItem(product)} className='group-hover:scale-150 ' >
      <IoMdAdd className="text-gray-400 text-2xl " />
      </motion.button>
    </li>
          ))}
        </ul>
        
        <h1 className='text-xl font-semibold'>Pets</h1>
        <ul className='grid  lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 xxs:grid-cols-1 gap-5'>
          {allProducts && CategoriasCollections("pets")?.map((product, index) => (
       <li className='group flex cursor-pointer items-center truncate justify-between px-4 gap-3 bg-white   shadow-md rounded-xl' key={index}>
       <motion.button onClick={()=>setSelectedProduct(product)} className=' py-4 '>{product.name}</motion.button>
      <motion.button onClick={()=>HandleAddItem(product)} className='group-hover:scale-150 ' >
      <IoMdAdd className="text-gray-400 text-2xl " />
      </motion.button>
    </li>
          ))}
        </ul> 
      </div>

*/
