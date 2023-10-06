"use client";
import React, { useEffect, useState } from "react";
import { UseDialog } from "./DialogContext";
import { AnimatePresence, motion } from "framer-motion";
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import { AiOutlineClose } from "react-icons/ai";
import { UseGlobal } from "./GlobalContext";


function SideDialog() {
  const { HandleCloseSideDialog,isSideDialogOpen, openSelect, setOpenSelect, HandleCloseSelect, } = UseDialog();
  const {HandleAddItem, getProductValues, setGetProductValues,HandleAddNewProducts } = UseGlobal()

  const Options = ["Beverages", "Meat and Fish", "Pets", "Fruit"];
  const [selectedOption, setSelectedOption] = useState("Category");
  const [onFocus, setOnFocus] = useState("");


  const HandleCategoryMenu = (option) => {
    setGetProductValues((Prev)=> ({...Prev, ["category"]:option }))
    setSelectedOption(option);
    HandleCloseSelect();
  };

  const HandleSaveNew = ()=>{
    HandleAddNewProducts()
    HandleCloseSideDialog()
  }

  useEffect(() => {
    const HandleClose = (e) => {
      if (openSelect && e.target.classList.contains("closeSelect")) {
        HandleCloseSelect();
      }
    };
    window.addEventListener("click", HandleClose);
    return () => {
      window.removeEventListener("click", HandleClose);
    };
  }, [openSelect, HandleCloseSelect]);
  

  return (
    <AnimatePresence>
      {isSideDialogOpen && (
        <motion.div className="closeSelect bg-[#fafafe] w-full h-full absolute top-0 left-0 z-50">
          <div className="closeSelect SideDialog flex flex-col px-10 gap-5 py-5">
            <h1 className="text-xl font-semibold">Add a new Item</h1>
            <div className="grid gap-3 closeSelect">
              <label
                htmlFor="Name"
                className={`${onFocus === "Name" ? "text-[#f9a109]" : ""}`}
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                onFocus={() => setOnFocus("Name")}
                onBlur={() => setOnFocus("")}
                value={getProductValues.name}
                onChange={(e)=>setGetProductValues((Prev)=> ({...Prev, [e.target.name]: e.target.value}))}
                id="Name"
                className="closeSelect border-2 focus:border-[#f9a109] outline-none py-3 px-3 rounded-xl"
                placeholder="Enter a name"
              />
            </div>
            <div className="grid gap-3 closeSelect">
              <label
                htmlFor="Note"
                className={`${onFocus === "Note" ? "text-[#f9a109]" : ""}`}
              >
                Note
              </label>
              <textarea
                id="Note"
                onFocus={() => setOnFocus("Note")}
                onBlur={() => setOnFocus("")}
                name="note"
                value={getProductValues.note}
                onChange={(e)=>setGetProductValues((Prev)=> ({...Prev, [e.target.name]: e.target.value}))}
                type="text"
                className="closeSelect border-2 focus:border-[#f9a109] outline-none py-3 px-3 rounded-xl"
                placeholder="Enter a name"
              />
            </div>
            <div className="grid gap-3 closeSelect">
              <label
                htmlFor="Image"
                className={`${onFocus === "Image" ? "text-[#f9a109]" : ""} `}>
                Image
              </label>
              <input
                type="text"
                id="Image"
                name="image"
                value={getProductValues.image}
                onChange={(e)=>setGetProductValues((Prev)=> ({...Prev, [e.target.name]: e.target.value}))}
                onFocus={() => setOnFocus("Image")}
                onBlur={() => setOnFocus("")}
                className="closeSelect border-2 focus:border-[#f9a109] outline-none py-3 px-3 rounded-xl"
                placeholder="Enter a name"
              />
            </div>
            <div className="grid gap-3 closeSelect">
              <label
                htmlFor="Category"
                className={`${
                  onFocus === "Category" ? "text-[#f9a109]" : "text-black"
                }`}
              >
                Category
              </label>
              <button
                id="Category"
                onClick={() => setOpenSelect(!openSelect)}
                onFocus={() => setOnFocus("Category")}
                onBlur={() => setOnFocus("")}
                className={`flex cursor-pointer justify-between items-center bg-white py-3 px-3 rounded-xl border-2 ${
                  onFocus === "Category" ? " border-[#f9a109]" : ""
                }  `}
              >
                <p
                  className={`${
                    onFocus === "Category" ? "text-[#f9a109]" : "text-black"
                  }`}
                >
                  {selectedOption}
                </p>
                {onFocus ? (
                  <AiOutlineClose className="text-2xl" />
                ) : (
                  <HiOutlineArrowLongRight className="text-2xl" />
                )}
              </button>

              {openSelect && (
                <ul className="grid py-3 px-3 bg-white rounded-xl z-10 shadow-2xl ">
                  {Options.map((option, index) => (
                    <li
                    key={index}
                      onClick={() => HandleCategoryMenu(option)}
                      className="hover:bg-gray-400 py-2 px-3 rounded-xl cursor-pointer"
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="absolute right-0 bottom-0 w-full px-5 py-5 bg-white">
              <div className="flex bg-white items-center w-full justify-center gap-8 ">
                <button onClick={()=>HandleCloseSideDialog()}>Cancel</button>
                <button onClick={()=>HandleSaveNew()} className="bg-[#f9a109] px-3 py-3 text-white rounded-xl">Save</button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SideDialog;
