import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
export const Logout = () => {
    // Logout component, just log user out and take him to `/` homepage
    // suggestion: if you are storing anyting in redux it's a good idea to
    // empty it before loggin out. eg: order
    const [isLoading, setIsLoading] = useState(true);
    const getdata = async () => {
        const response = await fetch('http://localhost:8080/users');
        const data = await response.json();
        // console.log(data);
        setIsLoading(false);
    }
    useEffect(() => {
        getdata();
    }, []);
    return (
        <div className="homepage">
            <h1>You have been logged out</h1>
            <Link to="/login">
                <button className="btn btn-primary">Login</button>
            </Link>
        </div>
    );
};



export default Logout;
   