"use client";
import React, { useEffect, useState } from "react";
import { UseGlobal } from "../context/GlobalContext";
import { UseDialog } from "../context/DialogContext";
import { toast } from "react-toastify";

function InputName() {
  const {
    inputName,
    HandleSubmit,
    setInputName,
    state,
    editar,
    setEditar,
    isChecked,
    itemsAdded,
    completedTask,
    HandlePost,
    currentValue, setCurrentValue,
  } = UseGlobal();
  
  const {  setIsConfirmOpen, isConfirmOpen } = UseDialog();

  const HandleSaveName = (e) => {
    if (inputName !== "") {
      HandleSubmit(e);
      setCurrentValue(inputName);
    } else {
      toast.error("Error please Enter name ");
    }
  };
  
  const handleComplete = () => {
    if (inputName !== "") {
      HandlePost({ status: true });
      setEditar(false);
      toast.success("Task has been completed successfully!")
    } else {
      toast.error(" Can not complete, please name a list first ");
    }
  };

  const handleCancel = () => {
    setIsConfirmOpen(true);
  };


  return (
    <>
      {!editar ? (
        <form
          onSubmit={HandleSubmit}
          className={`flex relative items-center border-2 rounded-xl px-2 ${
            state?.cart?.length === 0 || currentValue
              ? "border-[#e6e6e6]"
              : "border-[#f9a109]"
          }`}
        >
          <input
            type="text"
            onChange={(e) => setInputName(e.target.value)}
            value={inputName}
            disabled={state?.cart?.length === 0 || currentValue !== ''}
            className="rounded-xl outline-none py-2"
            placeholder="Enter a name"
          />
          <button
            onClick={(e) => HandleSaveName(e)}
            className={`border-2 absolute -right-1 ${
              state?.cart?.length === 0 || currentValue
                ? "bg-[#e6e6e6] border-[#e6e6e6]"
                : "border-[#f9a109] bg-[#f9a109]"
            }  rounded-xl py-2 px-3  transition-colors`}
          >
            Save
          </button>
        </form>
      ) : (
        <div className={`flex relative justify-center gap-5 rounded-xl px-2 `}>
          <button
            onClick={() => handleCancel()}
            className={`  rounded-xl py-2 px-3  `}
          >
            Cancel
          </button>
          <button
            onClick={() => handleComplete()}
            disabled={!isChecked}
            className={`${
              !isChecked ? " bg-gray-500" : "bg-[#4db8da]"
            } text-white -right-1 rounded-xl py-3 px-3  `}
          >
            Complete
          </button>
        </div>
      )}
    </>
  );
}

export default InputName;
