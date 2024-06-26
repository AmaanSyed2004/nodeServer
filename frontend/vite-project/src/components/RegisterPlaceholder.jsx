import { useState } from "react";
import Register from "../assets/register.svg";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
export default function RegisterPlaceholder() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
        mobileNumber: "",
        addressLine1: "",
        addressLine2: "",
        pincode: ""
    });

    const navigate= useNavigate();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleSubmit= async(e)=>{
        e.preventDefault();
        try{
            const response = await axios.post("http://localhost:3000/register", formData);
            console.log(response.data)
            navigate('/login')
        }catch (error){
            console.error(error);
        }
    }

    return (
        <main className="flex justify-center items-center h-[calc(100vh-3.5rem)]">
            <div className="flex justify-between w-3/4 rounded-3xl h-3/4 bg-white p-16">
                <div>
                    <h2 className="text-4xl font-bold">Register Here!</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-4">
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
                        <input 
                            name="email"
                            placeholder="Email" 
                            className="border-2" 
                            value={formData.email} 
                            onChange={handleInputChange} 
                        />
                        <input 
                            name="mobileNumber"
                            placeholder="Mobile Number" 
                            className="border-2" 
                            value={formData.mobileNumber} 
                            onChange={handleInputChange} 
                        />
                        <input 
                            name="addressLine1"
                            placeholder="Address Line 1" 
                            className="border-2" 
                            value={formData.addressLine1} 
                            onChange={handleInputChange} 
                        />
                        <input 
                            name="addressLine2"
                            placeholder="Address Line 2" 
                            className="border-2" 
                            value={formData.addressLine2} 
                            onChange={handleInputChange} 
                        />
                        <input 
                            name="pincode"
                            placeholder="Pincode" 
                            className="border-2" 
                            value={formData.pincode} 
                            onChange={handleInputChange} 
                        />
                        <button className="bg-sky-500 w-20 rounded-lg mt-5 text-white">Register</button>
                    </form>
                </div>
                <img src={Register} className="w-1/2" />
            </div>
        </main>
    );
}
