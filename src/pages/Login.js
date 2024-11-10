import React, { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

function Login() {
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handelStart = async () => {
    const response = await fetch(`https://finance-backend-2ssq.onrender.com/`, {
      method: "GET",
      headers: { "Content-type": "application/json" },
    });
  };

  useEffect(() => {
    handelStart();
  }, []);

  const handleVerify = async () => {
    if (number.length != 10) {
      return toast.error("Give a valid phonenumber");
    }
    setLoading(true);
    setNumber(Number(number));
    const response = await fetch(`https://finance-backend-2ssq.onrender.com/login`, {
      method: "POST",
      body: JSON.stringify({ phonenumber: number,name:name }),
      headers: { "Content-type": "application/json" },
    });
    const json = await response.json();
    if (!response.ok) {
      toast.error(json.error);
      console.log(response)
      setNumber("");
      setName("");
      setLoading(false);
    }
    if (response.ok) {
      sessionStorage.setItem("User", JSON.stringify(json.user));
      sessionStorage.setItem("token", json.token);
      setNumber("");
      setName("");
      setLoading(false);
      toast.success("Logged In Successfully");
      navigate("/Rules");
    }
  };
  return (
    <div className="m-0 p-0 bg-white flex flex-col w-full h-screen items-center" style={{
      backgroundImage: `url('./landing.png')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
    <div className=" w-full md:h-28 flex flex-row items-center px-4">
      <img
        src={"/Finance Logo.png"}
        width={100}
        height={100}
        className="md:w-24 md:h-24 w-16 h-16"
        alt="Ima"
        loading="lazy"
      />
      <h4 className="font-oxanium font-normal sm:text-7xl text-5xl tablet:text-4xl sm_mobile:text-3xl bg-gradient-to-r from-[#160f4a] via-[#04942C] to-[#160f4a] bg-clip-text text-transparent text-center flex-1">
        Era Of Estates
      </h4>
      <img
        src={"/SAC Logo.png"}
        width={100}
        height={100}
        className="md:w-20 md:h-20 ml-auto w-16 h-16"
        alt="image"
        loading="lazy"
      />
    </div>
    <div className="w-full h-[2px] bg-gradient-to-r from-accent to-primary">
      .
    </div>
    <div className="w-full h-full flex justify-center items-center">
      <div className="h-[19rem] flex items-center justify-center bg-gradient-to-r from-accent to-primary">
        <div className="relative">
          <div className="absolute -top-2 -left-2 -right-2 -bottom-2 rounded-lg bg-gradient-to-r from-accent to-primary shadow-lg animate-pulse"></div>
          <div
            id="form-container"
            className="bg-white p-16 rounded-lg sm_mobile:p-12 shadow-2xl w-80 sm_mobile:w-72 relative z-10 transform transition duration-500 ease-in-out"
          >
            <h2
              id="form-title"
              className="text-center text-3xl font-bold mb-10 text-gray-800 font-oxanium"
            >
              Login
            </h2>
            <div className="space-y-5">
              <input
                className="w-full h-12 border border-gray-800 px-3 rounded-lg"
                placeholder="Team Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="w-full h-12 border border-gray-800 px-3 rounded-lg"
                placeholder="Phone No."
                type="text"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
              <button
                className="w-full h-12 bg-primary hover:bg-accent text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-300 hover:scale-105 font-oxanium"
                onClick={() => handleVerify()}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    {loading && <Spinner />}
  </div>
  );
}

export default Login;
