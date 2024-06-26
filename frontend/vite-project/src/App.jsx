import Header from "./components/Header";
import Login from "./pages/Login"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from "./pages/Home";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/profile" element={<ProtectedRoute/>}>
          <Route path= "/profile" element= {<Profile/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}