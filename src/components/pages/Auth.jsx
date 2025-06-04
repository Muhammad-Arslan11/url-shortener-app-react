import React from "react";
import { useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from '../Login';
import Signup from '../Signup';

function auth() {
  const [searchParams] = useSearchParams();

  return (
    <div className="mt-36 flex flex-col items-center gap-10">
      <h1 className="text-5xl font-extrabold">
        {searchParams.get("createNew")
          ? "Hold up! Login first..."
          : "Login / SignUp"}
      </h1>
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2 bg-gray-600 text-black">
          {" "}
          {/* Set a background color for the tabs */}
          <TabsTrigger
            value="login"
            className="p-2 text-center cursor-pointer data-[state=active]:bg-gray-800 data-[state=active]:text-white "
          >
            Account
          </TabsTrigger>
          <TabsTrigger
            value="signup"
            className="p-2 text-center cursor-pointer data-[state=active]:bg-gray-800 data-[state=active]:text-white"
          >
            Password
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="login"
          className="p-4 bg-gray-600 text-black text-center data-[state=active]:bg-gray-800 data-[state=active]:text-white"
        >
          {" "}
          {/* Ensure content background and text color */}
        <Login/>
        </TabsContent>
        <TabsContent
          value="signup"
          className="p-4  bg-gray-600 text-black text-center data-[state=active]:bg-gray-800 data-[state=active]:text-white"
        >
          {" "}
          {/* Ensure content background and text color */}
          <Signup/>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default auth;
