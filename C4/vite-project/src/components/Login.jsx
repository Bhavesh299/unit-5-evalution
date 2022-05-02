import {useEffect, useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export const Login = () => {

  const [name, setName]= useState("");
  const [password, setPassword]= useState();
  const [list, setList]= useState();

  const getuserData=()=>{

  axios.get("http://localhost:8080/users", {
 params: {
        username: name,
        pass: password
        }
 })
 .then((data) => {
    console.log(data)
 })
 .catch((err) => console.log(err));
}

  return (
    <div>
      <input
        className="username"
        type="text"
        name="username"
        placeholder="Enter Username"
        onChange={(e)=>{setName(e.target.value)}}
      />
      <input
        className="password"
        type="password"
        name="password"
        placeholder="Enter password"
        onChange={(e)=>{setPassword(e.target.value)}}
      />
      {/* On this button click make network req to find user with same username and password */}
      {/* get his role, if role is `admin` take him to `/orders` page otherwise take him to `/neworder` */}
  
        <Link to="/orders">
            <button className="btn btn-primary" onClick={getuserData}>Login</button>
        </Link>

    </div>
    );
};

