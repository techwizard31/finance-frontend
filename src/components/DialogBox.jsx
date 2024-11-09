import { Button } from "./button.tsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./Dialog.tsx";
import { Input } from "./input.tsx";
import { Label } from "./label.tsx";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

export function DialogDemo({ type, item, price, number }) {
  const [isDialogOpen, setIsDialogOpen] = useState(true);
  const [units, setUnits] = useState(1);
  const [loading, setLoading] = useState(false);
  let { round } = useParams();
  const token = sessionStorage.getItem("token");
  const userData = sessionStorage.getItem("User");
  const user = userData ? JSON.parse(userData) : null;

  const handleSubmit = (event) => {
    //event.preventDefault();
    setIsDialogOpen(false);
  };
  
  const handleBuy = async () => {
    handleSubmit();
    if (units < 1) {
      return toast.error("Give valid inputs");
    }
    if (number - units * price < 0) {
      return toast.error("You don't have enough points to buy these items");
    }
    setLoading(true);
    setUnits(Number(units));
    const response = await fetch(`${process.env.REACT_APP_LINK}/cart/buy`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        user: user,
        item: item,
        number: units,
        price: price,
        round: round,
      }),
    });

    if (!response.ok) {
      toast.error(response.statusText);
      setUnits(1);
      setLoading(false);
    }

    if (response.ok) {
      const json = await response.json();
      sessionStorage.setItem("User", JSON.stringify(json));
      setUnits(1);
      setLoading(false);
      toast.success("Transaction Successful");
    }    
  };

  const handleSell = async () => {
    handleSubmit();
    if (units < 1) {
      return toast.error("Give valid inputs");
    }
    if (number - units < 0) {
      return toast.error("You don't have that many stocks to sell");
    }
    setLoading(true);
    setUnits(Number(units));

    const response = await fetch(`${process.env.REACT_APP_LINK}/cart/sell`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        user: user,
        item: item,
        number: units,
        price: price,
        round: round,
      }),
    });

    if (!response.ok) {
      toast.error(response.statusText);
      setUnits(1);
      setLoading(false);
    }

    if (response.ok) {
      const json = await response.json();
      sessionStorage.setItem("User", JSON.stringify(json));
      setUnits(1);
      setLoading(false);
      toast.success("Transaction Successful");
    }    
  };

  return (
    <>
    {
      (
        <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{type === "Buy" ? "Buy" : "Sell"}</Button>
      </DialogTrigger>
      {
        isDialogOpen &&(
          <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Cart</DialogTitle>
          <DialogDescription>
            Enter the no. of units you want to {type}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="No" className="text-right">
              Units
            </Label>
            <Input
              id="No"
              defaultValue={units}
              type="number"
              onChange={(e) => setUnits(e.target.value)}
              className="col-span-3 border-2 border-black"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            className="bg-black text-white"
            onClick={() => { if (type === "Buy") 
              { handleBuy();
              }
              else { handleSell()
              } }}
          >
            {type === "Buy" ? "Buy" : "Sell"} Items
          </Button>
        </DialogFooter>
      </DialogContent>
        )
      }
    </Dialog>
      )
    }
    </>
  )
}