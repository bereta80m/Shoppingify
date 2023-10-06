"use client";
import React, { createContext, useContext, useState } from "react";

const DialogContext = createContext({});

function DialogProvider({ children }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSideDialogOpen, setIsSideDialogOpen] = useState(false);
  const [openSelect, setOpenSelect] = useState(false);
  const [isPullOpen, setIsPullOpen] = useState(true);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  const HandleCloseConfirm = ()=>{
    if (isConfirmOpen) {
      setIsConfirmOpen(false);
    }
  }
  const HandlePullClose = ()=>{
    if (isPullOpen) {
      setIsPullOpen(false);
    }
  }
  const HandleCloseSelect = () => {
    if (openSelect) {
      setOpenSelect(false);
    }
  };

  const HandleCloseSideDialog = () => {
    if (isSideDialogOpen) {
      setIsSideDialogOpen(false);
    }
  };
  const HandleCloseDialog = () => {
    if (isDialogOpen) {
      setIsDialogOpen(false);
    }
  };
  return (
    <DialogContext.Provider
      value={{
        HandleCloseDialog,
        isDialogOpen,
        setIsDialogOpen,
        HandleCloseSideDialog,
        isSideDialogOpen,
        setIsSideDialogOpen,
        openSelect, setOpenSelect,HandleCloseSelect,
        isPullOpen, setIsPullOpen,HandlePullClose,
        HandleCloseConfirm,setIsConfirmOpen,isConfirmOpen,
      }}>
      {children}
    </DialogContext.Provider>
  );
}

export default DialogProvider;

export const UseDialog = () => useContext(DialogContext);
