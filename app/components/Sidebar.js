"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { TfiMenuAlt } from "react-icons/tfi";
import { ImHistory } from "react-icons/im";
import { BiBarChartSquare } from "react-icons/bi";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useActiveHook from "../customHooks/useActiveHook";
import { UseDialog } from "../context/DialogContext";
import { UseGlobal } from "../context/GlobalContext";

function Sidebar() {
  const router = useRouter();
  const {
    InputLine,
    lineStyle,
    ActiveRef,
    linePosition,
    setLinePosition,
    setInputLine,
  } = useActiveHook();
  const {setIsDialogOpen,} = UseDialog()
  const {state} = UseGlobal()
  const [totalQuantity, setTotalQuantity] = useState(0)
  
  useEffect(() => {
    const HandleQuantity = ()=>{
      if (state) {
        const response =  state?.cart.reduce((acc, item) => {
          return acc + item.quantity 
          },0)
          setTotalQuantity(response)
      }
    }
    HandleQuantity()
  }, [state?.cart])

  return (
    <aside className="grid col-start-1 col-span-1 bg-[#ffffff] justify-between gap-20 items-center w-20 h-screen border p-2 ">
      <div className="bg-myLogo w-12 h-12 bg-contain bg-no-repeat my-5 " />
      <ul className="flex flex-col items-center w-full gap-16 ">
        {menuItems.map((item, index) => {
          return (
            <Link
              key={index}
              ref={InputLine === item.path ? ActiveRef : null}
              href={`${item.path}`}
              onClick={() => setInputLine(item.path)}>
              {item.Icons}
            </Link>
          );
        })}
        <div
          className=" rounded-tr-lg rounded-br-lg bg-[#f9a109] p-1 absolute left-0"
          style={lineStyle}
        />
      </ul>
      <div className="bg-[#f9a109] relative p-3 rounded-full text-white my-5">
        <span className="absolute -top-2 -right-0 bg-[#eb5757] px-2 rounded-md ">
          {totalQuantity}
        </span>
        <HiOutlineShoppingCart onClick={()=>setIsDialogOpen(true)} className="cursor-pointer text-3xl text-white " />
      </div>
    </aside>
  );
}

export default Sidebar;

const menuItems = [
  { label: "Items", path: "/", Icons: <TfiMenuAlt className="text-3xl" /> },
  {
    label: "History",
    path: "/History",
    Icons: <ImHistory className="text-3xl" />,
  },
  {
    label: "Statistics",
    path: "/Statistics",
    Icons: <BiBarChartSquare className="text-3xl" />,
  },
];
