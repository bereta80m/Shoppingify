"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import {HiMiniPlus} from "react-icons/hi2"
import {FiMinus} from "react-icons/fi"
import {PiTrashSimple} from "react-icons/pi"
import { UseGlobal } from "./GlobalContext";

function ToggleButton({item}) {
  const controls = useAnimation();
  const [showButtons, setShowButtons] = useState(false);
  const {HandleRemove, HandleIncrease,HandleDecrease, state,HandleClear,setItemsAdded,setCurrentValue,setInputName} = UseGlobal()

  const HandleClose = ()=>{
    setShowButtons(false);
  }
  useEffect(() => {
    const handleTurnOffToggle = (e)=>{
        if (showButtons && e.target.classList.contains('SideRightBar')) {
            HandleClose()
        }
    }
    window.addEventListener("click", handleTurnOffToggle);
    return () => {
        window.removeEventListener("click", handleTurnOffToggle);
    }
  }, [showButtons,HandleClose])


const HandleRemoval = (item)=>{
  const currentName = localStorage.getItem("NewCartName")
  const PreviousCartName = currentName ? currentName : null
  
  if (state.cart.length > 1 && currentName) {
    const newList = state.cart.filter((fil)=> fil._id !== item._id)
    localStorage.setItem(currentName, JSON.stringify(newList)); 
  }

  if (state.cart.length === 1 ) {
    localStorage.removeItem("NewCartName")
    localStorage.removeItem(currentName)
    HandleClear(item)
    setItemsAdded([])
    setCurrentValue('')
    setInputName('')
  }
  
  HandleRemove(item)

}

  return (
    <AnimatePresence>
      <motion.div className={`${showButtons && 'bg-white'} flex gap-2 rounded-xl relative `}>
        {showButtons && (
            <>
            <motion.button  onClick={()=>HandleRemoval(item)} className="bg-[#f9a109]  rounded-xl px-2">
                <PiTrashSimple className=" text-xl font-bold text-white " />
            </motion.button>
          <motion.button
          onClick={()=>HandleDecrease(item)}

          className="flex items-center gap-2 text-[#f9a109] "

            initial={{ x: "80%" }}
            animate={{ x: 0 }}
            exit={{ x: "80%" }}
            whileHover={{ scale: 1.5 }}>
             <FiMinus className=" text-xl " /> 
          </motion.button>
          </>
        )}
        <motion.span
        className="flex cursor-pointer truncate select-none px-5 py-1 my-2 items-center gap-2 border-2 border-[#f9a109] text-[#f9a109] rounded-3xl"
          onClick={()=>setShowButtons(!showButtons)}
          animate={controls}>
          {item.quantity} pcs
        </motion.span>
        {showButtons && (
          <motion.button
          onClick={()=>HandleIncrease(item)}

          className="flex items-center gap-2 text-[#f9a109] "
            initial={{ x: "-80%" }}
            animate={{ x: 0 }}
            exit={{ x: "-80%" }}
            whileHover={{ scale: 1.5 }}>
           
            <HiMiniPlus className=" text-3xl " /> 
          </motion.button>
        )}
                 

      </motion.div>
    </AnimatePresence>
  );
}

export default ToggleButton;
