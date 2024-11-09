import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/Table.tsx";

function Result() {
  const token = sessionStorage.getItem("token");
  const [winner, setWinner] = useState();
  const userData = sessionStorage.getItem("User");
  const user = userData ? JSON.parse(userData) : null;
  
  const getResult = async () => {
    const userData = sessionStorage.getItem("User");
    const user = userData ? JSON.parse(userData) : null;
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
      console.log(json);
    }
    if (response.ok) {
      sessionStorage.setItem("User", JSON.stringify(json.user));
    }
  };

  const getWinner = async () => {
    const response = await fetch(`https://finance-backend-2ssq.onrender.com/cart/result`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await response.json();
    if (!response.ok) {
      console.log(json.error);
    }
    if (response.ok) {
      setWinner(json);
    }
  };

  useEffect(() => {
    if (user && user.finalamount === 0) {
      getResult();
    }
    if (token) {
      getWinner();
    }
  }, [user, token]);

  return (
    <section className="h-screen bg-radial-bottom-corners px-2">
      <div className=" w-full md:h-28 flex flex-row items-center px-4">
        <img
          src={"/Finance Logo.png"}
          width={100}
          height={100}
          className="md:w-24 md:h-24 w-16 h-16"
          alt="Ima"
          loading="lazy"
        />
        <h4 className="font-playflair sm:text-7xl text-5xl tablet:text-4xl sm_mobile:text-3xl bg-gradient-to-r from-[#160f4a] via-[#04942C] to-[#160f4a] bg-clip-text text-transparent text-center flex-1">
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
      <div className="w-full h-[2px] bg-gradient-to-r from-accent to-primary mb-3">
        .
      </div>
      <div className="relative drop-shadow-xl w-full h-[80%] overflow-hidden rounded-xl bg-[#3d3c3d]">
        <div
          className="absolute flex flex-col items-center justify-center
          text-white z-[1] opacity-90 rounded-xl inset-0.5 bg-[#323132]"
        >
          <ul>
            <li className="text-4xl text-white sm:mx-60 mx- mb-5">
              Leaderboard
            </li>
          </ul>
          <Table className="w-[80%] mx-auto">
            <TableHeader className="mx-auto">
              <TableRow>
                <TableHead className="text-center">Rank</TableHead>
                <TableHead className="text-center">Name</TableHead>
                <TableHead className="text-center">Points</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {winner && winner.length > 0 ? (
                winner.map((invoice, index) => (
                  <TableRow key={invoice.name}>
                    <TableCell className="font-medium text-center">
                      {index + 1} {/* Rank */}
                    </TableCell>
                    <TableCell className="text-center">
                      {invoice.name} {/* Name */}
                    </TableCell>
                    <TableCell className="text-center">
                      {invoice.finalamount} {/* Final Amount */}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">
                    No winners available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="absolute w-56 h-48 bg-white blur-[50px] -left-1/2 -top-1/2"></div>
      </div>
    </section>
  );
}

export default Result;
