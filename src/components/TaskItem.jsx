import axios from 'axios';
import React, { useContext, useState } from 'react'
import { toast, Toaster } from 'react-hot-toast';
import { AuthContext } from '../context/auth/AuthContext';



const TaskItem = ({ id, title, details, update }) => {

    const context = useContext(AuthContext);
    const task = context.task;
    const setTask = context.setTask;

    const [isChecked, setIsChecked] = useState(update);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    }



    const updateTask = async (id) => {
        try {
            await axios.put(`http://localhost:5000/task/${id}`, {},
                {
                    withCredentials: true
                })
            toast.success("Task updated")
        } catch (error) {
            console.log(error)
        }
    }



    const deleteTask = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/task/${id}`,
                {
                    withCredentials: true
                }
            )
            const indexToDelete = task.findIndex((item) => item._id === id);
            if (indexToDelete !== -1) {
                task.splice(indexToDelete, 1);
            }
            setTask([...task])
            toast.success("Task Deleted")
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <>
            <div className=' flex justify-between bg-white w-[30rem] p-4'>
                <div className='flex flex-col '>
                    <h1 className=' font-semibold text-xl'>{title}</h1>
                    <p className=' text-lg' >{details}</p>
                </div>
                <div className=' flex justify-center items-center space-x-3'>
                    <label>
                        <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                            onClick={() => { updateTask(id) }}
                            className='h-5 w-5'
                        />
                        {/* Check me */}
                    </label>

                    <button className="bg-black text-white px-4 py-1" onClick={() => { deleteTask(id) }} >
                        DELETE
                    </button>
                </div>
            </div>
            <div><Toaster /> </div>
        </>
    )
}

export default TaskItem
