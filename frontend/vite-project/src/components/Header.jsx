import { Link } from "react-router-dom";

export default function Header(){
    return(
        <header className="w-full h-14 flex justify-between px-8 items-center bg-slate-500">
            <div className="font-serif text-4xl text-"> MERN Auth </div>
            <div className="flex justify-end gap-8 items-center w-1/2">
                <Link className="bg-amber-300 rounded-md hover:bg-amber-200" to="/profile">Profile</Link>
                <Link className="bg-amber-300 rounded-md hover:bg-amber-200" to="/register"> Register</Link>
                <Link className="bg-amber-300 rounded-md hover:bg-amber-200" to="/login"> Login</Link>
            </div>
        </header>


    )
}