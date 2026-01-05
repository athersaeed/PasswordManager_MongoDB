import React from 'react'

const Footer = () => {
  return (
    <div className='bg-slate-800 text-white flex flex-col justify-center items-center w-full py-2'>
      <div className="logo font-bold text-2xl">
        <span className='text-green-500'> &lt;</span>
        <span>Pass</span><span className='text-green-500'>Guard/&gt;</span>
      </div>
      <div className='flex justify-center items-center'>
        Created with <span className='text-red-500 text-2xl mx-2'>&#9829;</span> by You
      </div>
      <div className="flex gap-4 text-[10px] text-slate-400 mt-1">
        <a href="https://www.flaticon.com/free-icons/eye" target="_blank" rel="noreferrer" className='hover:text-white transition-colors'>Eye icons by Gregor Cresnar</a>
        <a href="https://www.flaticon.com/free-icons/eye-password" target="_blank" rel="noreferrer" className='hover:text-white transition-colors'>Eye password icons by sonnycandra</a>
        <a href="https://www.flaticon.com/free-icons/duplicate" title="duplicate icons">Duplicate icons created by Ranah Pixel Studio - Flaticon</a>
        <a href="https://www.flaticon.com/free-icons/edit" title="edit icons">Edit icons created by Pixel perfect - Flaticon</a>
      </div>
    </div>
      )
}

      export default Footer;
