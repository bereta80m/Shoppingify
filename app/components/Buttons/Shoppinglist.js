"use client"
import { UseGlobal } from '@/app/context/GlobalContext';
import React, { useEffect, useState } from 'react'
import { BiSolidPencil } from "react-icons/bi";

function Shoppinglist() {
    const { setEditar,editar,isChecked,currentValue ,HandleSubmit,HandleRemove} = UseGlobal();
    const [NameList, setNameList] = useState("")

    useEffect(() => {
      setNameList(localStorage.getItem('NewCartName'))
    }, [currentValue,HandleRemove])

  return (
    <div className="flex w-full items-center justify-between px-2 py-10  SideRightBar">
    <p className="text-2xl px-3 font-bold truncate SideRightBar">
      {NameList ||  'Shopping list'}
    </p>
    <BiSolidPencil  onClick={()=> !isChecked && setEditar(!editar)} className={`text-2xl cursor-pointer ${isChecked && 'text-gray-400'}`} />
  </div>
  )
}

export default Shoppinglist
