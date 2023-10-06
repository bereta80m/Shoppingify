"use client"
import React from 'react'
import { LiaLongArrowAltLeftSolid } from "react-icons/lia";
import { Quicksand } from "next/font/google";
import { useRouter } from 'next/navigation';
const QuickFont = Quicksand({ subsets: ["latin"], weight: ["600"] });

function Header() {
  const router = useRouter()
  return (
    <header
    className={`${QuickFont.className} hidden lg:flex pb-12 items-center gap-7`} >
    <h1 className="flex gap-3 items-center text-xl  text-[#f9a109]">
      <label  onClick={()=> router.back()} className='flex items-center cursor-pointer'>
      <LiaLongArrowAltLeftSolid className="text-3xl   text-[#f9a109]" /> <p className='select-none'>Back</p>
      </label>
    </h1>
  </header>
  )
}

export default Header
