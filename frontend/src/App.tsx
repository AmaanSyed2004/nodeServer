import Login from "./pages/Login";
import "../app/globals.css";
import { BrowserRouter, Routes } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import { Route } from "react-router-dom";
import Login2fa from "./pages/Login2fa";
function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/login" element={<Login />}>
          <Route path="2fa" element={<Login2fa />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
