
"use client"
import React, { useEffect, useRef } from 'react'
import { Quicksand } from "next/font/google";
const QuickFont = Quicksand({ subsets: ["latin"],weight:['600'] });
import {BsCalendar4Range} from "react-icons/bs"
import {MdArrowForwardIos} from "react-icons/md"
import Link from 'next/link';
import ShopHistory from '../components/ShopHistory';
import DialogConfirm from '../context/DialogConfirm';
import { UseGlobal } from '../context/GlobalContext';
import Dialog from '../context/Dialog';


function History() {
  const CurrentRef  = useRef(null)
  const {historyData, historyList, }= UseGlobal()

  const HandleScrollToBottom = ()=>{
    if (CurrentRef.current) {
      CurrentRef.current.scrollTop = CurrentRef.current.scrollHeight 
    }
  }

  useEffect(() => {
    HandleScrollToBottom()
  }, [historyData])

  return (
    <div ref={CurrentRef}  style={{
      overflow: "auto",
      scrollbarWidth: "none",                                        
      msOverflowStyle: "none"}} className={`${QuickFont.className}  relative flex w-full flex-col gap-5 SideRightBar pb-16 py-5 lg:px-20 md:px-12 sm:px-9 xs:px-6 xxs:px-3 bg-[#fafafe] h-full`}>
      <Header />
      <ShopHistory />
      <DialogConfirm />
      <Dialog />


    </div>
  )
}

export default History

const Header = ()=>{
  return ( 
    <header className={`${QuickFont.className} hidden lg:flex pb-12 items-center gap-7`}>
      <h1 className=' text-2xl'>Shopping History</h1>
    </header>
  )
}