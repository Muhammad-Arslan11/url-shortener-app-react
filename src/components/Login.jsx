import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BeatLoader } from "react-spinners";

function Login() {
  return (
    <div>
      <Card className="bg-gray-800 border-2 border-black">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Login to your account</CardDescription>
          {/* <CardAction>Card Action</CardAction> */}
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Input name="email" type="email" placeholder="Enter your email" />
            <Input
              name="password"
              type="password"
              placeholder="Enter your password"
            />
          </div>
        </CardContent>
        <div className="flex justify-center">
          <CardFooter>
            <Button>
              {true ? <BeatLoader size={10} color="#36d7b7" /> : "Login"}
            </Button>
          </CardFooter>
        </div>
      </Card>
    </div>
  );
}

export default Login;
