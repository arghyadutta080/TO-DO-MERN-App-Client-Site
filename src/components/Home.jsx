import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from "../context/auth/AuthContext";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from 'react-hot-toast';
import TaskItem from './TaskItem';



const Home = () => {

    const context = useContext(AuthContext);
    const isAuthenticated = context.isAuthenticated;
    const setIsAuthenticated = context.setIsAuthenticated;
    const user = context.user;
    const setUser = context.setUser;
    const task = context.task;
    const setTask = context.setTask;

    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");



    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://to-do-app-by-mern-stack.vercel.app/task/addtask', {
                title: title,
                description: details
            },
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                }
            )
            toast.success("Task Added")
            setTask([...task, { title: title, description: details }])
            console.log(title, details)
        } catch (error) {
            console.log(error)
        }
    } 



    useEffect(() => {

        axios.get('https://to-do-app-by-mern-stack.vercel.app/user/me', {
            withCredentials: true
        })
            .then((res) => {
                console.log(res.data)
                setIsAuthenticated(true)
                setUser(res.data)
            })
            .catch((err) => {
                console.log(err)
                setIsAuthenticated(false)
                setUser({})
            })

        axios.get('https://to-do-app-by-mern-stack.vercel.app/task/gettask', {
            withCredentials: true
        })
            .then((res) => {
                setTask(res.data)
                console.log(task)
                setIsAuthenticated(true)
                // setUser(res.data)
            })
            .catch((err) => {
                console.log(err)
                setIsAuthenticated(false)
                // setUser({})
            })
    }, [])




    if (isAuthenticated === false) {
        return <Navigate to="/login" />;
    }



    return (
        <div className='flex flex-col items-center bg-slate-200 h-[100vh] m-0 p-0'>
            <div className=' font-semibold text-2xl my-10' >Welcome Back {user!=[]?user.name:user.name}</div>
            <form className=" flex justify-center bg-white py-10 w-1/3" onSubmit={submitHandler}>
                <div className="flex flex-col space-y-5 items-center">
                    <input
                        type="text"
                        className="border border-black w-80 p-3"
                        id="floatingInput"
                        placeholder="Task Title"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                        required
                    />
                    <input
                        type="text"
                        className="border border-black w-80 p-3"
                        id="floatingPassword"
                        placeholder="Task Details"
                        value={details}
                        onChange={(e) => {
                            setDetails(e.target.value);
                        }}
                        required
                    />
                    <button className="bg-black text-white w-40 px-5 py-2" type="submit">
                        ADD TASK
                    </button>
                </div>
            </form>
            <div><Toaster /></div>
            <div className='flex flex-col justify-center items-center space-y-4 my-10'>
                {
                    task.map((e) => {
                        return (<TaskItem key={e._id} title={e.title} details={e.description} id={e._id} update={e.isCompleted} />)
                    })
                }
            </div>
        </div>
    )
}

export default Home
