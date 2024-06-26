import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios"
import { UserContext } from "../../context/userData";
export default function ProtectedRoute() {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData]= useState(null);
  useEffect(() => {
    const verify = async () => {
      try {
        const response = await axios.get("http://localhost:3000/protected", {withCredentials: true});        
        setUserData(response.data.user);
        console.table(userData);
        setIsAuth(response.data.isAuth);
      } catch (err) {
        console.log(err)
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };
    verify();
  }, []);

  if (loading) return <div>Loading</div>;
  console.log(isAuth)
  return isAuth ? (<UserContext.Provider value={userData}><Outlet/></UserContext.Provider>) : <Navigate to="/login" />;
}
