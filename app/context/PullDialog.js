"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import { AiOutlineClose } from "react-icons/ai";

import { HiArrowNarrowLeft } from "react-icons/hi";
import Image from "next/image";
import { UseDialog } from "./DialogContext";
import { UseGlobal } from "./GlobalContext";

function PullDialog() {
  const [onFocus, setOnFocus] = useState("");
  const { isPullOpen, setIsPullOpen,HandlePullClose} = UseDialog()  
  const {selectedProduct,setSelectedProduct,HandleAddItem} = UseGlobal()
   //const {name, description, imageURL, category} = selectedProduct


  return (
    <AnimatePresence>
      {selectedProduct && (
        <motion.div className="closeSelect bg-[#fafafe] w-full h-full absolute top-0 left-0 z-50">
          <div className="closeSelect SideDialog flex flex-col px-10 gap-5 py-5">
            <h1 onClick={()=>setSelectedProduct(null)} className="flex select-none cursor-pointer items-center gap-3 text-lg text-[#f9a109] font-semibold">
              <HiArrowNarrowLeft className="text-2xl text-[#f9a109]" /> Back
            </h1>
            <div className="grid gap-5 closeSelect">
              <Image
                src={`${selectedProduct?.imageURL || 'https://e7.pngegg.com/pngimages/709/358/png-clipart-price-toyservice-soil-business-no-till-farming-no-rectangle-pie.png'}`}
                alt=""
                className="object-cover rounded-xl w-full h-[280px] max-h-[280px] "
                width={500}
                height={500}
              />
              <div className="grid">
                <label className="text-gray-400">Name</label>
                <p>{selectedProduct?.name}</p>
              </div>
              <div className="grid">
                <label className="text-gray-400">Category</label>
                <p>{selectedProduct?.category}</p>
              </div>
              <div style={{overflow: "auto", scrollbarWidth: "none", msOverflowStyle: "none"}} className="grid h-44 text-justify">
                <label className="text-gray-400">Note</label>
                <p>{selectedProduct?.description}</p>
              </div>
            </div>
            <div className="absolute right-0 bottom-0 w-full px-5 py-5 bg-white">
              <div className="flex bg-white items-center w-full justify-center gap-8 ">
                <button onClick={()=>setSelectedProduct(null)} >Delete</button>
                <button onClick={()=>HandleAddItem(selectedProduct)} className="bg-[#f9a109] px-3 py-3 text-white rounded-xl">Add to list</button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default PullDialog;
