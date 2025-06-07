import React, { useEffect, useState } from "react";
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
import Error from "./Error";
import * as Yup from "yup";
import useFetch from "@/hooks/useFetch";
import {login} from "../../db/apiAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import {UrlState}  from '../UrlContext'; 
function Login() {
  // const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  let [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const {data, error, loading, fn: fnLogin} = useFetch(login, formData);
  const [fetchUser] = UrlState();

  useEffect(()=>{
    if(error === null && data){
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : " "}`);
      fetchUser();
    }
  }, [data, error])

  async function handleLogin() {
    setErrors([]);
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email("Invalid Email")
          .required("Email is required"),
        password: Yup.string().min(
          3,
          "Password must be at least 3 characters!"
        ),
      });

      await schema.validate(formData, { abortEarly: false });
      //api call
      fnLogin();
      // Simulate a login delay
      setTimeout(() => {
        console.log("Login success!");
      }, 4000);
    } catch (e) {
      const NewError = {};
      e?.inner?.forEach((err) => {
        NewError[err.path] = err.message;
      });

      setErrors(NewError);
    }
  }

  return (
    <div className="mb-4">
      <Card className="bg-gray-800 border-2 border-gray-400 text-white rounded-lg">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Login to your account</CardDescription>
        </CardHeader>
       {error && <Error message={error.message}/>} 
        <CardContent className="p-4">
          <div className="space-y-4">
            <Input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 placeholder-gray-500 text-white focus:outline-none focus:border-blue-500"
            />
            {errors.email && <Error message={errors.email} />}
            <Input
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 placeholder-gray-500 text-white focus:outline-none focus:border-blue-500"
            />
            {errors.password && <Error message={errors.password} />}
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex justify-center w-full">
            <Button
              onClick={handleLogin}
              className="w-full flex justify-center bg-gray-700 hover:bg-gray-600"
            >
              {loading ? (
                <div className="flex justify-center items-center w-full bg-gray-800 py-1 rounded">
                  <BeatLoader size={8} color="#36d7b7" />
                </div>
              ) : (
                <span>Login</span>
              )}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Login;
