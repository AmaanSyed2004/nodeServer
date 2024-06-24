import { Link } from "react-router-dom"
import Login from "../assets/login.svg"
export default function InputPlaceholder(){
    return(
        <main className="flex justify-center items-center h-[calc(100vh-3.5rem)]">
            <div className="flex justify-between w-3/4 rounded-3xl h-3/4 bg-white p-16">
                <div className="">
                    <h2 className="text-4xl font-bold">Hey,</h2>
                    <h2 className="text-4xl font-bold">Welcome Back</h2>
                    <p>Continue to login</p>
                    <div className="flex flex-col gap-2 mt-10">
                    <input placeholder="Username" className="border-2"/>
                    <input placeholder='Password' type="password" className="border-2"/>
                    <button className="bg-sky-500 w-20 rounded-lg mt-10 text-white ">Sign in</button>
                    </div>
                    <p className="mt-5"> Dont have an account? <Link to='/register'>Sign Up</Link></p>
                </div>
                <img src={Login}  className="w-1/2"/>
            </div>

        </main>
    )
}