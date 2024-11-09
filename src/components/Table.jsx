import { DialogDemo } from "./DialogBox";
import Data from '../lib/data';
import { ChartCandlestick } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "./Table.tsx";
import { useParams } from "react-router-dom";

export function TableDemo({ type }) {
  let { round } = useParams();
  const token = sessionStorage.getItem("token");
  const userData = sessionStorage.getItem("User");
  const user = userData ? JSON.parse(userData) : null;

  function getPrice(name) {
    const commodity = Data.find((item) => item.Commodityname === name);
    return commodity ? commodity.prices : null;
  }

  function getChange(name, round) {
    const commodity = Data.find((item) => item.Commodityname === name);
    if (!commodity) return null;
    const prices = commodity.prices;

    if (round > 2) {
      const change = ((prices[round - 1] - prices[round - 2]) / prices[round - 2]) * 100;
      return change.toFixed(2);
    } else {
      return prices[round - 1];
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Commodity</TableHead>
          <TableHead>
            {type === "Buy" ? "Cost Price" : round >= 2 ? "% Change" : "Current Price"}
          </TableHead>
          {type !== "Buy" && <TableHead>No</TableHead>}
          <TableHead>{type === "Buy" ? "Buy" : "Sell"}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {type === "Buy" ? (
          Data.map((commodity) => (
            <TableRow key={commodity.Commodityname}>
              <TableCell className="font-medium">
              <div className='flex gap-5 mb-2 items-center'>
                <img
                  src={commodity.Image}
                  alt={commodity.Commodityname}
                  width={30}
                  height={30}
                />
                <h1 className='text-white text-xl'>{commodity.Commodityname}</h1>
              </div>
              </TableCell>
              <TableCell>{commodity.prices[round - 1]}</TableCell>
              <TableCell>
                <DialogDemo
                  type={type}
                  item={commodity.Commodityname}
                  price={commodity.prices[round - 1]}
                  number={user?.amount}
                />
              </TableCell>
            </TableRow>
          ))
        ) : (
          user?.cart.map((invoice) => (
            <TableRow key={invoice._id}>
              <TableCell className="font-medium">
                <ChartCandlestick />
                {invoice.item}
              </TableCell>
              <TableCell>
                {round >= 2
                  ? `${getChange(invoice.item, round)} %`
                  : getChange(invoice.item, round)}
              </TableCell>
              <TableCell>{invoice.number}</TableCell>
              <TableCell>
                <DialogDemo
                  type={type}
                  item={invoice.item}
                  price={getPrice(invoice.item)[round - 1]}
                  number={invoice.number}
                />
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}