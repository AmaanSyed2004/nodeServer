import { useContext } from "react";
import { UserContext } from "../../context/userData";
import Background from "../components/Background";
import Header from "../components/Header";
export default function Profile() {
  const userData = useContext(UserContext);
  console.table(userData);
  return (
    <>
      <Background />
      <Header />
      <main className="flex w-full h-[calc(100vh-3.5rem)] justify-center items-center">
        <div className="w-3/4  bg-white rounded-3xl p-5">
          <h1 className="text-center text-4xl font-bold">
            Welcome to your profile!
          </h1>
          <div className="mt-8 bg-slate-200 p-8 rounded-3xl">
            <h2 className="text-lg ">Username: {userData.username}</h2>
            <h2 className="text-lg ">Email: {userData.email}</h2>
            <h2 className="text-lg ">Phone: {userData.mobileNumber}</h2>
            <h2 className="text-lg ">
              Address: {userData.addressLine1 + userData.addressLine2 ?? ""}{" "}
            </h2>
            <h2 className="text-lg ">Pincode: {userData.pincode}</h2>
            <h2 className="text-lg ">
              Roles: {userData.roles.map((role) => role)}
            </h2>
            <h2 className="text-lg "></h2>
          </div>
        </div>
      </main>
    </>
  );
}
