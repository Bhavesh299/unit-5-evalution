// /orders and /neworder are protected routes
import { useState, useEffect } from "react";
export const ProtectedRoute = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        const checkLogin = async () => {
        const response = await fetch("/api/login");
        const body = await response.json();
        setIsLoggedIn(body.loggedIn);
        setIsLoading(false);
        };
        checkLogin();
    }, []);
    
    if (isLoading) {
        return <div>Loading...</div>;
    }
    
    if (isLoggedIn) {
        return children;
    } else {
        return <div>You are not logged in</div>;
    }

    return (
        <div>
            <h1>You are not logged in</h1>
        </div>
    );

};