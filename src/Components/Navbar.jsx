import React from 'react';

const Navbar = () => {
    return (

        <nav className='bg-slate-700 text-white mx-5 my-5 card-3d py-3 px-0'>
            <div className='flex justify-between mycontainer'>
                <div className="logo font-bold text-2xl">
                    <span className='text-green-600'>&lt;</span>
                    Pass
                    <span className='text-green-600'>Guard/&gt;</span>
               </div>
                <button className='text-white hover:scale-110 transition-transform'>
                    <img className='w-6' src="/icons/github-mark-white.svg" alt="github_logo" />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;