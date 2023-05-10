import React, { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { AuthContext } from "../context/auth/AuthContext";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { set } from "mongoose";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const context = useContext(AuthContext);
    const isAuthenticated = context.isAuthenticated;
    const setIsAuthenticated = context.setIsAuthenticated;



    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/user/login", {
                email: email,
                password: password
            },
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                }
            )
            setIsAuthenticated(true);
            // toast.success("login successfully")
        } catch (error) {
            toast.error("Error found")
            setIsAuthenticated(false);

        }
    };



    if (isAuthenticated) {
        return <Navigate to="/" />;
    }



    return (
        <div>
            <form className="m-5 flex justify-center" onSubmit={submitHandler}>
                <div className="flex flex-col space-y-5 items-center">
                    <input
                        type="email"
                        className="border w-80 p-3"
                        id="floatingInput"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        required
                    />
                    <input
                        type="password"
                        className="border w-80 p-3"
                        id="floatingPassword"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        required
                    />
                    <button className="bg-black text-white w-40 px-5 py-2" type="submit">
                        Login
                    </button>
                    <p>Don't have an account ?</p>
                    <Link to="/register">Sign Up</Link>
                </div>
            </form>
            <div><Toaster /></div>
        </div>
    );
};

export default Login;
