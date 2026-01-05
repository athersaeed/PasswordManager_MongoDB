import React from 'react'
import { useRef } from 'react'
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';

// Manager Component takes in passwordArray, setPasswordArray, form, setForm as props
const Manager = ({ passwordArray, setPasswordArray, form, setForm }) => {
    
    const iconRef = useRef(null);

    const savePassword = async () => {
        // Logic to save password
        if(!form.site.length > 3 || !form.username.length > 3 || !form.password.length > 3){
            toast('Please fill all fields correctly!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
            });
            return;
        }
        // POST request to backend
        let res = await fetch("http://localhost:3000", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({...form})
        });
        let data = await res.json();
        // Add the new password to the array
        setPasswordArray([...passwordArray, {...form, _id: data.result.insertedId || form._id}]);
        console.log(passwordArray);
        // setting form back to empty
        setForm({site: "", username: "", password: ""});
        toast('Password Saved Successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
        });
    }


    const showPassword = () => {
        // Logic to toggle password visibility
        const passwordInput = document.getElementById('passwordInput');
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            iconRef.current.src = "../../icons/eye_cross.png";
        } else {
            passwordInput.type = 'password';
            iconRef.current.src = "../../icons/eye.png";
        }
    }


    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm({...form, [name]: value});
    }

    return (
        <div className='mx-5 my-5'>
            {/* background from bg.ibelick.com */}
            <div className="absolute bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>

            {/* input fields` */}
            <div className="mycontainer bg-slate-100 mycontainer card-3d">
                <h1 className='text-4xl font-bold text-center'>
                    <span className='text-green-600'>&lt;</span>
                    Pass
                    <span className='text-green-600'>Guard/&gt;</span></h1>
                <p className='text-green-900 text-lg text-center'>Your own Password Manager</p>
                <div className="relative text-white flex flex-col  max-w-2xl p-4 gap-4 mx-auto">
                    <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className='border border-green-700 bg-green-75 rounded-full text-black px-4 py-1' type="text" name='site' />
                    <div className="flex flex-col md:flex-row gap-4">
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username / Email' className='border border-green-700 bg-green-75 rounded-full text-black px-4 py-1 w-full md:w-1/2' type="text" name='username'  />

                        <div className="relative w-full md:w-1/2">
                            <input value={form.password} onChange={handleChange} placeholder='Enter Password' className='border border-green-700 w-full bg-green-75 rounded-full text-black px-4 py-1' type="password" name='password' id='passwordInput' />
                            <span className='absolute right-1.5 top-1 cursor-pointer text-green-700 w-6 hover:scale-110 transition-transform' onClick={showPassword}>
                                <img ref={iconRef} src="../../icons/eye.png" alt="" />
                            </span>
                        </div>
                    </div>

                    <button onClick={savePassword} className='flex justify-center items-center gap-3 max-w-52 mx-auto bg-green-700 hover:bg-green-800 text-white px-4 py-1 rounded-full'>
                        <span className='text-xl font-semibold -mt-1'>Save</span>
                        <span className='flex items-center'><lord-icon
                            src="https://cdn.lordicon.com/ueoydrft.json"
                            trigger="hover"
                            colors="primary:#314158,secondary:#16a34a,tertiary:#f1f5f9"
                            style={{ width: "28px", height: "28px" }}>
                        </lord-icon></span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Manager