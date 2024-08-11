import { Button } from "../components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"


export default function Login() {
  
  return (
    <Card className="w-1/3">
      <CardHeader>
        <CardTitle>Login to the account</CardTitle>
        <CardDescription>Proceed to login!</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="Username">Username</Label>
              <Input id="name" placeholder="Enter your Username" />
              <Label htmlFor="password">Password</Label>
              <Input id="password" placeholder="Enter your password" type="password" />
            </div>
            <div className="flex flex-col space-y-1.5">
            </div>  
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Clear Input</Button>
        <Button>Go!</Button>
      </CardFooter>
    </Card>
  )
}
