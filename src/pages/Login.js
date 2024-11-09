import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const [number, setNumber] = useState("");
  const navigate = useNavigate();
  const handleVerify = async () => {
    setNumber(Number(number));
    const response = await fetch(`${process.env.REACT_APP_LINK}/login`, {
      method: "POST",
      body: JSON.stringify({ phonenumber: number }),
      headers: { "Content-type": "application/json" },
    });
    const json = await response.json();
    if (!response.ok) {
      toast.error(json.error);
    }
    if (response.ok) {
      console.log(JSON.stringify(json.user), JSON.stringify(json.token));
      sessionStorage.setItem("User", JSON.stringify(json.user));
      sessionStorage.setItem("token", JSON.stringify(json.token));
      toast.success("Logged In Successfully");
      navigate("/dashboard");
    }
  };
  return (
    <div className="m-0 grid items-center bg-green-200 h-screen w-screen">
      <div className="flex items-center justify-center bg-slate-300 w-1/3 mx-auto h-1/5 flex-col gap-2">
        <div className="relative">
          <input
            id="username"
            type="text"
            placeholder=""
            value={number}
            className="border-b border-gray-300 py-1 focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-slate-200 ps-1"
            onChange={(e) => setNumber(e.target.value)}
          />
          <label
            for="username"
            className="absolute -top-4 text-xs left-0 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all peer-focus:text-blue-700 peer-placeholder-shown:top-1 peer-placeholder-shown:text-sm ps-1"
          >
            PhoneNumber
          </label>
        </div>
        <button
          className="h-max w-fit text-xl bg-white px-2 py-1 rounded hover:bg-black hover:text-white transition-colors duration-100"
          onClick={() => handleVerify()}
        >
          Verify
        </button>
      </div>
    </div>
  );
}

export default Login;
