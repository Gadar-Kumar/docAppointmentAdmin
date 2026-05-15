import React from 'react'
import { useState,useEffect } from 'react';
import { Moon, Sun } from "lucide-react";



const ToggleTheme = () => {

    const [dark, setDark] = useState(
        localStorage.getItem("theme") === "dark"
      );

      useEffect(()=>{
        if(dark){
            document.documentElement.classList.add('dark')
            localStorage.setItem('theme','dark')
        }else{
            document.documentElement.classList.remove('dark')
            localStorage.setItem('theme','light')
        }
      },[dark])

  return (
    <div>
      <button
      onClick={() => setDark(!dark)}
      className="p-2 rounded-lg cursor-pointer bg-gray-200 dark:bg-gray-700"
    >
        {dark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
    </div>
  )
}

export default ToggleTheme
