import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function Login2fa() {
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        
    }
    function handleClear() {
        setFormData({ email: "", OTP: "" });
      }
    const [formData, setFormData]= useState({email:"", OTP:""})
    function handleInput(e: React.ChangeEvent<HTMLInputElement>): void {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

  return (
    <main className="flex justify-center items-center flex-col w-screen h-screen">
    <Card className="w-1/3">
      <CardHeader>
        <CardTitle>Let's make sure it's really you</CardTitle>
        <CardDescription>Use Google Authenticator for OTP verification</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInput}
              />
              <Label htmlFor="password">OTP</Label>
              <Input
                id="password"
                name="password"
                placeholder="Enter your OTP"
                type="password"
                value={formData.OTP}
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
