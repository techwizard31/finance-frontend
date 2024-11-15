import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { toast } from "react-toastify";

function Round() {
  const navigate = useNavigate();
  let { round } = useParams();
  round = parseInt(round, 10);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const token = sessionStorage.getItem("token");
  const userData = sessionStorage.getItem("User");
  const user = userData ? JSON.parse(userData) : null;

  const getResult = async () => {
    const response = await fetch(
      `https://finance-backend-2ssq.onrender.com/cart/myresult`,
      {
        method: "POST",
        body: JSON.stringify({ user: user }),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const json = await response.json();
    if (!response.ok) {
      console.log(json.error);
    }
    if (response.ok) {
      sessionStorage.setItem("User", JSON.stringify(json.user));
    }
  };

  const QuitResult = async () => {
    if(user.chance == 3){
      getResult();
      navigate("/Result");
    }
    const response = await fetch(
      `https://finance-backend-2ssq.onrender.com/cart/quit`,
      {
        method: "POST",
        body: JSON.stringify({ user: user }),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const json = await response.json();
    if (!response.ok) {
      console.log(json.error);
    }
    if (response.ok) {
      sessionStorage.setItem("User", JSON.stringify(json.user));
    }
  };

  useEffect(() => {
    setTimeLeft(300); // Reset timer to 60 seconds whenever round changes

    const timerInterval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerInterval);
          return 0; // Stop at zero
        }
        return prevTime - 1;
      });
    }, 1000);

    const timeout = setTimeout(() => {
      setIsRedirecting(true);
      if (round >= 22) {
        getResult();
        navigate("/Result");
      } else {
        toast.success("Moving on to the next round")
        navigate(`/rounds/${round + 1}`)
      }
    }, 300000);

    return () => {
      clearInterval(timerInterval);
      clearTimeout(timeout);
    };
  }, [navigate, round]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (!isRedirecting) {
        event.preventDefault();
        event.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isRedirecting]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const handleQuit = () => {
    QuitResult();
    navigate("/Result");
  };

  return (
    <div className="min-h-screen bg-geometric-dark-green-pattern">
      <nav>
        <ul className="flex sm:justify-between justify-evenly font-semibold items-center w-full h-fit mx-auto text-black py-3 sm:px-5">
          <li>
            <p className="text-xl sm:text-4xl tracking-wider text-[#04942C] font-oxanium">
              ROUND-{round}
            </p>
          </li>
          <div className="rightnav sm:w-1/2 flex justify-evenly gap-2 items-center">
            <li>
              <p className="text-sm sm:text-2xl tracking-wider text-[#04942C] font-oxanium">
                POINTS-{user?.amount}
              </p>
            </li>
            <li>
              <button
                className="bg-red-950 text-red-400 border border-red-400 border-b-4 font-medium overflow-hidden relative px-2 sm:px-4 py-1 sm:py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
                onClick={() => handleQuit()}
              >
                <span className="bg-red-400 shadow-red-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)] font-oxanium"></span>
                Quit
              </button>
            </li>
            <li>
              <p className="text-sm sm:text-2xl tracking-wider text-[#04942C] font-oxanium">
                Time left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
              </p>
            </li>
          </div>
        </ul>
      </nav>
      <div className="sm:flex-row flex flex-col justify-evenly mt-10 gap-3 px-4 max-h-full">
        <Card type={"Buy"} />
        <Card type={"Sell"} />
      </div>
    </div>
  );
}

export default Round;
