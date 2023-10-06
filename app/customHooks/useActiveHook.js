import React, { useEffect, useRef, useState } from 'react'

import { usePathname } from 'next/navigation'

export default function useActiveHook() {
  const [linePosition, setLinePosition] = useState({top: 0, height: 0 })
  const pathname = usePathname()

  const [InputLine, setInputLine] = useState(`${pathname}`)

  const ActiveRef = useRef(null);

  useEffect(() => {
    const HandleLine = ()=>{
        const ActiveLink = ActiveRef.current;
        if (ActiveLink) {
            const { offsetTop, offsetHeight } = ActiveLink;
            setLinePosition({top: offsetTop, height: offsetHeight})
        }
    }
    HandleLine()
    window.addEventListener("resize", HandleLine)
    return ()=>{
        window.removeEventListener("resize", HandleLine)
    }
},[InputLine])
      // Style the line with top and height for vertical positioning
      const lineStyle = {
        top: linePosition.top - 8 + 'px',
        height: linePosition.height + 15 + 'px',
      };

  return {
    linePosition,
    setLinePosition,
    setInputLine,
    InputLine,
    ActiveRef,
    lineStyle
  }
}


