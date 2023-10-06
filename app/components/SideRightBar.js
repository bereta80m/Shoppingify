import React from "react";
import { Quicksand } from "next/font/google";
const QuickFont = Quicksand({ subsets: ["latin"], weight: ["600"] });
import Dialog from "../context/Dialog";
import { BiSolidPencil } from "react-icons/bi";
import ToggleButton from "../context/ToggleButton";
import AddedProducts from "./AddedProducts";
import InputName from "./InputName";
import SideDialog from "../context/SideDialog";
import AddItemBtn from "./Buttons/AddItemBtn";
import PullDialog from "../context/PullDialog";
import ImageNoItems from "./Buttons/ImageNoItems";
import Shoppinglist from "./Buttons/Shoppinglist";

function SideRightBar() {

  return (
    <aside
      className={`${QuickFont.className} SideRightBar flex flex-col relative items-center  lg:px-8 py-10 h-full bg-[#fff0de]`}>
      <div className="flex px-2  relative bg-[#80485b] rounded-3xl lg:max-w-72 md:w-64  h-40">
        <div className="bg-mySource bg-no-repeat bg-contain lg:w-44 lg:h-44 md:w-44 md:h-44  lg:-mt-5 md:-mt-5 " />
        <div className="flex flex-col py-5 gap-5">
          <p className="text-white ">Didn't find what you need ?</p>
          <AddItemBtn />
        </div>
      </div>
      <Shoppinglist />

      <AddedProducts />
      <ImageNoItems />
      <div className="absolute right-0 bottom-0 w-full px-5 py-5 bg-white z-40">
        <InputName />
      </div>
      <PullDialog />
      <SideDialog />
      <Dialog />
    </aside>
  );
}

export default SideRightBar;
