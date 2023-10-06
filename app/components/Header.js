"use client"
import React, { useEffect } from 'react'

import {HiSearch} from "react-icons/hi"
import { UseDialog } from '../context/DialogContext';
import { Quicksand } from "next/font/google";
import { UseGlobal } from '../context/GlobalContext';
const QuickFont = Quicksand({ subsets: ["latin"],weight:['600'] });

// Chakra Petch , Mooli
function Header() {
  const {setIsDialogOpen} = UseDialog()
  const {allProducts,searchValue, setSearchValue} = UseGlobal()
  


  return (
    <header className='hidden lg:flex  items-center gap-7 py-5 px-20 bg-[#fafafe]'>
      <p className={`${QuickFont.className} text-[26px] font-semibold`} ><span className='text-[#F9A109]'>Shoppingify</span> allows you take your shopping list wherever you go</p>
    <div className='flex items-center gap-5 bg-white px-3 py-2 rounded-lg'>
        <HiSearch className='text-2xl'/>
        <input value={searchValue} onChange={(e)=>setSearchValue(e.target.value)} className="bg-transparent border-none outline-none" type='text' placeholder='Search for items' />
    </div>
    </header>
  )
}

export default Header
