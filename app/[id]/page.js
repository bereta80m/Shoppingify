import React from "react";
import DialogConfirm from "../context/DialogConfirm";
import Header from "./Header";
import { Quicksand } from "next/font/google";
import ComponentsProducts from "./ComponentsProducts";
import Dialog from "../context/Dialog";
const QuickFont = Quicksand({ subsets: ["latin"], weight: ["600"] });

function List({params}) {
  
  return (
    <div className={`${QuickFont.className} relative py-5  lg:px-20 md:px-12 sm:px-9 xs:px-6 xxs:px-3  bg-[#fafafe] h-screen`}>
      <Header />
      <ComponentsProducts params={params} />
      <DialogConfirm />
      <Dialog />
    </div>
  );
}

export default List;

