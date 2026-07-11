'use client'
import { Bell, Menu, SquareUser } from 'lucide-react';
import React, { FC } from 'react';


const Toolbar: FC = () => {
  
   const onToggle = (): void => {
    const sideBarElem = document.getElementById('left-side-bar')
    sideBarElem?.classList.toggle('hidden')
  }
   const onLogout = (): void => {
document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
window.location.reload()
  }
  
  return ( <>
    <div className="w-full h-[48px]  sticky top-0 z-index-9 border-b-1 border-[lightgray]">
      <div className='p-1 h-full flex justify-between items-center'>
        <div className='flex gap-2'>
          <div className='flex items-center cursor-pointer text-teal-800 hover:scale-[1.25]' onClick={onToggle}><Menu /></div>
          <div className='px-1 text-[20px] cursor-pointer text-teal-800 font-extrabold hover:scale-[1.25]'>ZenFlow</div>
        </div>
         <div className='flex gap-2'>
        <div className='flex items-center cursor-pointer text-teal-800 hover:scale-[1.25]'><Bell/></div>
        <div className='flex items-center cursor-pointer text-teal-800 hover:scale-[1.25]'  onClick={onLogout}><SquareUser/></div>
        </div>

      </div>
    </div>
  </>
);}

export default Toolbar;