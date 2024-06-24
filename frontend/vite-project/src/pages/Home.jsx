import Background from "../components/Background";
import Header from "../components/Header";
import Cat from '../assets/undraw_cat_epte.svg'
export default function Home() {
  return (
    <>
      <Background />
      <Header />
      <main className="h-[calc(100vh-3.5rem)] flex justify-center items-center ">
        <img src={Cat} className="h-40"/>
        <div className="flex flex-col gap-4">
        <h1 className="text-6xl text-white">Welcome to  MERN auth</h1>
        <p className="text-3xl text-white">Get started by registering!</p>
        </div>
      </main>
    </>
  );
}
