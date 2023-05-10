import React, { useState } from 'react'
import { AuthContext } from './AuthContext';
import axios from 'axios';
import { useEffect } from 'react';


const AuthState = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState([]);
    const [task, setTask] = useState([])
    
    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, loading, setLoading, user, setUser, task, setTask }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState