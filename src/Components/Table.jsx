import React from 'react'
import { ToastContainer, toast } from 'react-toastify';

const Table = ({ passwordArray, deletePassword, editPassword }) => {

    const copyText = (text) => {
        navigator.clipboard.writeText(text);
        toast('Copied to Clipboard', {
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


    return (
        <div className='mx-5 my-5'>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="absolute bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
            <div className="mycontainer mx-auto mt-10 mb-24 p-4 bg-green-50 rounded-lg shadow-lg border border-green-200">
                <h2 className='text-2xl font-bold text-green-900 mb-4 px-4'>Your Passwords</h2>
                {passwordArray.length === 0 && (<p className='text-green-700 px-4'>No passwords saved yet.</p>
                )}
                {passwordArray.length > 0 && (
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full rounded-md overflow-hidden">
                            <thead className='bg-green-800 text-white'>
                                <tr>
                                    <th className='py-2 px-4 text-left'>Site</th>
                                    <th className='py-2 px-4 text-left'>Username</th>
                                    <th className='py-2 px-4 text-left'>Password</th>
                                    <th className='py-2 px-4 text-left'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-white'>
                                {passwordArray.map((item, index) => {
                                    return <tr key={item._id} className='border-b border-green-100 hover:bg-green-50'>
                                        <td className='py-2 px-4'><a href={item.site} target='_blank'>{item.site}</a></td>
                                        <td className='py-2 px-4'>{item.username}</td>
                                        <td className='py-2 px-4 flex justify-between'>{"•".repeat(item.password.length)}
                                            <img onClick={() => { copyText(item.password) }} className='w-4 h-4 hover:scale-110 transition-transform cursor-pointer' src="/icons/copy.png" alt="copy icon" />
                                        </td>
                                        <td className='py-2 px-4 '>
                                            <div className='flex gap-4 justify-center items-center align-middle -mt-2'>
                                                <span><img className='w-4 h-4 hover:scale-110 transition-transform cursor-pointer' onClick={() => { editPassword(item._id) }} src="/icons/edit.png" alt="edit icon"/></span>
                                                <span><img className='w-4 h-4 hover:scale-110 transition-transform cursor-pointer' onClick={() => {deletePassword(item._id)}} src="/icons/delete.png" alt="delete icon" /></span></div>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Table
