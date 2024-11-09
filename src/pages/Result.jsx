import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/Table.tsx"

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
]

function Result() {
  const token = sessionStorage.getItem("token");
  const userData = sessionStorage.getItem("User");
  const user = userData ? JSON.parse(userData) : null;
  const [winner, setWinner] = useState();

  const getResult = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_LINK}/cart/myresult`,
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

  const getWinner = async () => {
    const response = await fetch(`${process.env.REACT_APP_LINK}/cart/result`, {
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
    <section className='h-screen bg-radial-bottom-corners px-2'>
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
      <div className="w-full h-[2px] bg-gradient-to-r from-accent to-primary mb-3">.</div> 
      <div
        className="relative drop-shadow-xl w-full h-[80%] overflow-hidden rounded-xl bg-[#3d3c3d]"
      >
        <div
          className="absolute flex flex-col items-center justify-center
          text-white z-[1] opacity-90 rounded-xl inset-0.5 bg-[#323132]"
        >
          <ul>
            <li className='text-4xl text-white sm:mx-60 mx- mb-5'>
              Leaderboard
            </li>
          </ul>
          <Table className='w-[80%] mx-auto'>
          <TableHeader className='mx-auto'>
            <TableRow>
              <TableHead className="text-center">Rank</TableHead>
              <TableHead className='text-center'>Name</TableHead>
              <TableHead className="text-center">Points</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.invoice}>
                <TableCell className="font-medium text-center">{invoice.invoice}</TableCell>
                <TableCell className='text-center'>{invoice.paymentStatus}</TableCell>
                <TableCell className="text-center">{invoice.totalAmount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </div>
        <div className="absolute w-56 h-48 bg-white blur-[50px] -left-1/2 -top-1/2"></div>
      </div>
    </section>
  )
}

export default Result;