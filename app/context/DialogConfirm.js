"use client";
import React, { useEffect } from "react";
import { UseDialog } from "./DialogContext";
import { AnimatePresence, motion } from "framer-motion";
import { IoCloseSharp } from "react-icons/io5";
import { UseGlobal } from "./GlobalContext";
import { toast } from 'react-toastify';

function DialogConfirm() {
  const { HandleCloseConfirm, setIsConfirmOpen, isConfirmOpen } = UseDialog();
  const {
    setHistoryData,
    historyData,
    HandlePost,
    HandleClear,
    setItemsAdded,
    setEditar,
  } = UseGlobal();

  const HandleCancel = (e) => {
    const currentName = localStorage.getItem("NewCartName");
    if (currentName) {
      HandlePost({ status: false });
      HandleCloseConfirm();
      setEditar(false);
      localStorage.removeItem("NewCartName");
      localStorage.removeItem(currentName);
      setItemsAdded([]);
      HandleClear();
      toast.success("List has been cancelled! ");

    }
    else{
      toast.error("Error please Enter name ");
    }
  };

  return (
    <AnimatePresence>
      {isConfirmOpen && (
        <motion.div className="grid place-items-center bg-black/20 z-50  fixed inset-0 w-full h-screen">
          <div className="lg:w-1/4 lg:h-1/4 md:w-1/2 md:h-1/3 sm:w-1/3 sm:h-1/3 xs:w-1/2  xs:h-1/3 w-1/2 h-1/3 shadow-xl bg-white rounded-xl ">
            <div className="grid relative  w-full h-full px-8 py-5">
              <IoCloseSharp
                onClick={() => HandleCloseConfirm()}
                className="absolute cursor-pointer  right-0 text-2xl m-3 "
              />
              <p style={{ wordBreak: "break-word" }} className="  text-xl ">
                Are you sure that you want to cancel this list ?
              </p>
              <div className="flex gap-5  items-center absolute right-0 bottom-0 px-5 py-5">
                <button
                  onClick={() => HandleCloseConfirm()}
                  className="px-3 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={() => HandleCancel()}
                  className="bg-red-500 px-3 py-2 rounded-lg text-white"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default DialogConfirm;
