// import React from 'react'

// function Login() {
//   return (
//     <div class="flex flex-col gap-2 p-4 w-full h-full justify-center items-center">
//       <div className="flex flex-col gap-4 w-[50%]">
//         <div>Login</div>
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
//       <input type="button" value='login' className="border w-[50%] rounded mx-auto p-2" />
//       </div>
//     </div>
//   )
// }

// export default Login


import React,{ useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.text();
      console.log(response);
      console.log(response.ok);
      
      

      if (response.ok) {
        alert("Login Successful!");
      } else {
        alert(data.message || "Login Failed!");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="flex flex-col gap-2 p-4 w-full h-full justify-center items-center">
      <div className="flex flex-col gap-4 w-[50%]">
        <div className="text-xl font-bold">Login</div>
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
          onClick={handleLogin}
          className="border w-[50%] rounded mx-auto p-2 bg-blue-500 text-white"
        >
          Login
        </button>
      </div>
    </div>
  );
}
