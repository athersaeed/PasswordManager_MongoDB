import { useState, useEffect, useRef } from 'react'
import './App.css'
import Navbar from './Components/Navbar.jsx'
import Manager from './Components/Manager.jsx'
import Footer from './Components/Footer.jsx'
import Table from './Components/Table.jsx'
import React from 'react'
import { toast } from 'react-toastify'

function App() {
  const [passwordArray, setPasswordArray] = useState([]);
  const [form, setForm] = useState({ site: "", username: "", password: "" })

  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000/");
    let res = await req.json();
    setPasswordArray(res);
    console.log(res);

  }

  useEffect(() => {
    getPasswords();

  }, []);

  const deletePassword = async (id) => {

    let confirmDelete = window.confirm("Are you sure you want to delete this password?");
    if (!confirmDelete) {
      return;
    }

    let newPasswordArray = passwordArray.filter(item => item._id !== id);
    setPasswordArray(newPasswordArray);

    await fetch("http://localhost:3000/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ _id: id })
    });

    toast('Password Deleted!', {
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

  const editPassword = async (id) => {

    // Logic to edit password can be implemented here
    setForm(passwordArray.find(item => item._id === id));
    let newPasswordArray = passwordArray.filter(item => item._id !== id);
    setPasswordArray(newPasswordArray);
    
    await fetch("http://localhost:3000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ _id: id })
    });
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="grow">
        <Manager passwordArray={passwordArray} setPasswordArray={setPasswordArray} form={form} setForm={setForm} />
        <Table passwordArray={passwordArray} deletePassword={deletePassword} editPassword={editPassword} />
      </div>
      <Footer />
    </div>
  )
}

export default App
