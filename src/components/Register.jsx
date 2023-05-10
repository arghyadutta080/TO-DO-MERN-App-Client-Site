import React, { useState, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
// import { AuthContext } from "../context/auth/AuthContext";
import { Navigate } from "react-router-dom";


const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [submit, setSubmit] = useState(false)

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/user/register", {
                name: name,
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
            toast.success("submitted")
            setSubmit(true)
        } catch (error) {
            toast.error("Error found")
        }
    };


    if (submit) {
        return <Navigate to="/login" />;
    }


    return (
        <div>
            <form className="m-5 flex justify-center" onSubmit={submitHandler}>
                <div className="flex flex-col space-y-5 items-center">
                    <input
                        type="text"
                        className="border w-80 p-3"
                        id="floatingInputname"
                        placeholder="Full name"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                        required
                    />
                    <input
                        type="email"
                        className="border w-80 p-3"
                        id="floatingInputemail"
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
                        Register Now
                    </button>
                </div>
            </form>
            <div><Toaster /></div>
        </div>
    );
};

export default Register;
