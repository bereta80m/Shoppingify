"use client"
import { UseGlobal } from "@/app/context/GlobalContext";
import React, { useEffect } from "react";

function ImageNoItems() {
  const { state } = UseGlobal();



  if (state?.cart?.length === 0) {
    
    return (
      <div className="grid justify-center  relative w-full px-5 text-black py-5 h-72   z-20">
        No items
        <div className="absolute right-11 bottom-0 bg-undraw_shopping bg-no-repeat bg-contain w-52 h-52 " />
      </div>
    );
  }
}

export default ImageNoItems;
