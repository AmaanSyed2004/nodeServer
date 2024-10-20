import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  function handleClear() {
    setFormData({ username: "", password: "" });
  }
  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    try {
      const response: AxiosResponse = await axios.post(
        "http://localhost:3000/login",
        formData
      );
      console.log(response);
      toast({
        title: "Success!",
        description: response.data.message,
      });
      navigate("/login/2fa");
    } catch (e: any) {
      console.error(e)
      const errorMessage = e.response?.data?.message ?? "Please try again!";
      toast({
        variant: "destructive",
        title: "Oh No! An error occured!",
        description: errorMessage
      });
    }
  }
  return (
    <main className="flex justify-center items-center flex-col w-screen h-screen">
      <Card className="w-1/3">
        <CardHeader>
          <CardTitle>Login to the account</CardTitle>
          <CardDescription>Proceed to login!</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  placeholder="Enter your Username"
                  value={formData.username}
                  onChange={handleInput}
                />
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  type="password"
                  value={formData.password}
                  onChange={handleInput}
                />
              </div>
              <div className="flex flex-col space-y-1.5"></div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleClear}>
              Clear Input
            </Button>
            <Button type="submit">Go!</Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}
