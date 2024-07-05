import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Login from "../assets/login.svg";
import axios from 'axios'
export default function InputPlaceholder() {
    // State object for all input fields
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    const navigate= useNavigate()
    // Handler function for input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    async function handleSubmit(e){
        e.preventDefault();
        try {
            const response= await axios.post("http://localhost:3000/login",formData, {withCredentials: 'true'})
            console.log(response.data)
            navigate('/profile')
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <main className="flex justify-center items-center h-[calc(100vh-3.5rem)]">
            <div className="flex justify-between w-3/4 rounded-3xl h-3/4 bg-white p-16">
                <div className="">
                    <h2 className="text-4xl font-bold">Hey,</h2>
                    <h2 className="text-4xl font-bold">Welcome Back</h2>
                    <p>Continue to login</p>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-10">
                        <input 
                            name="username"
                            placeholder="Username" 
                            className="border-2" 
                            value={formData.username} 
                            onChange={handleInputChange} 
                        />
                        <input 
                            name="password"
                            placeholder="Password" 
                            type="password" 
                            className="border-2" 
                            value={formData.password} 
                            onChange={handleInputChange} 
                        />
                        <button className="bg-sky-500 w-20 rounded-lg mt-10 text-white" type="submit">Sign in</button>
                    </form>
                    <p className="mt-5">Don't have an account? <Link to='/register'>Sign Up</Link></p>
                </div>
                <img src={Login} className="w-1/2" />
            </div>
        </main>
    );
}
