"use client";
import { UseDialog } from "@/app/context/DialogContext";
import React from "react";

function AddItemBtn() {
  const { setIsSideDialogOpen } = UseDialog();


  
  return (
    <>

    <button
      onClick={() => setIsSideDialogOpen(true)}
      className="bg-white rounded-xl py-2 w-24  lg:text-base md:text-sm ">
      Add Item
    </button>
    </>
  );
}

export default AddItemBtn;
