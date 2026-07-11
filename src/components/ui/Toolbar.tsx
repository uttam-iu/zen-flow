import { Bell, Menu, SquareUser } from 'lucide-react';
import React, { FC } from 'react';



const Toolbar: FC = () => (
  <>
    <div className="w-full h-[48px]  sticky top-0 z-index-9 border-b-1 border-[lightgray]">
      <div className='p-1 h-full flex justify-between items-center'>
        <div className='flex gap-2'>
          <div className='flex items-center cursor-pointer text-teal-800 hover:scale-[1.25]'><Menu /></div>
          <div className='px-1 text-[20px] cursor-pointer text-teal-800 font-extrabold hover:scale-[1.25]'>ZenFlow</div>
        </div>
         <div className='flex gap-2'>
        <div className='flex items-center cursor-pointer text-teal-800 hover:scale-[1.25]'><Bell/></div>
        <div className='flex items-center cursor-pointer text-teal-800 hover:scale-[1.25]'><SquareUser/></div>
        </div>

      </div>
    </div>
  </>
);

export default Toolbar;