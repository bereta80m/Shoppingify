"use client";

import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { UseDialog } from "./DialogContext";
import { GrClose } from "react-icons/gr";
import Shoppinglist from "../components/Buttons/Shoppinglist";
import AddItemBtn from "../components/Buttons/AddItemBtn";
import { Quicksand } from "next/font/google";
import AddedProducts from "../components/AddedProducts";
import ImageNoItems from "../components/Buttons/ImageNoItems";
import InputName from "../components/InputName";
import PullDialog from "./PullDialog";
import SideDialog from "./SideDialog";
const QuickFont = Quicksand({ subsets: ["latin"], weight: ["600"] });

function Dialog() {
  const { HandleCloseDialog, isDialogOpen } = UseDialog();

  return (
    <AnimatePresence>
      {isDialogOpen && (
        <motion.div
          className="bg-white  block md:hidden w-full h-full absolute top-0 left-0 z-50"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
        >
          <GrClose
            onClick={() => HandleCloseDialog()}
            className="cursor-pointer z-30 text-3xl absolute right-0 m-3"
          />

          <div className="relative  dialog-content h-screen">
            <aside className={`${QuickFont.className}  px-11  SideRightBar flex flex-col relative items-center lg:px-8 py-10 h-full bg-[#fff0de]`}>
              <div className="flex px-2 w-full relative bg-[#80485b] rounded-3xl  h-40">
                <div className="bg-mySource bg-no-repeat bg-contain w-44 h-44 -mt-5  " />
                <div className="flex flex-col py-5 gap-5">
                  <p style={{ overflowWrap:'break-word' }} className="text-white ">Didn't find what you need ?</p>
                  <AddItemBtn />
                </div>
              </div>
              <Shoppinglist />
              <AddedProducts />
              <ImageNoItems />
              <div className="absolute bottom-0 w-full px-5 py-5 bg-white z-40">
                <InputName />
              </div>
              <PullDialog />
              <SideDialog />
            </aside>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Dialog;
