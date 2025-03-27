// import React, {useEffect, useState} from "react";

// function Signup() {
//   const [username, setusername] = useState("")
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")

  

//   return (
//     <div class="flex flex-col gap-2 p-4 w-full h-full justify-center items-center">
//       <div className="flex flex-col gap-4 w-[50%]">
//         <div>Sign up</div>
//       <input
//         type="text"
//         placeholder="First Name"
//         class="w-full p-2 border rounded"
//       />
//       <input
//         type="email"
//         placeholder="Email"
//         class="w-full p-2 border rounded"
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         class="w-full p-2 border rounded"
//       />
//       <input type="button" value='signup' className="border w-[50%] rounded mx-auto p-2" />
//       <div>Already Signed up?<span className="text-blue-600"> login</span></div>
//       </div>
//     </div>
//   );
// }

// export default Signup;


import React,{ useState } from "react";
import {useNavigate} from "react-router-dom"

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const handleSignUp = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password }),
      });

      const data = await response.json();
      console.log(data);
      

      if (response.ok) {
        alert("Signup Successful! You can now login.");
        navigate("/login")
      } else {
        alert(data.message || "Signup Failed!");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="flex flex-col gap-2 p-4 w-full h-full justify-center items-center">
      <div className="flex flex-col gap-4 w-[50%]">
        <div className="text-xl font-bold">Sign Up</div>
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 border rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleSignUp}
          className="border w-[50%] rounded mx-auto p-2 bg-green-500 text-white"
        >
          Sign Up
        </button>
        <div>
          Already Signed up?{" "}
          <span className="text-blue-600 cursor-pointer">Login</span>
        </div>
      </div>
    </div>
  );
}
