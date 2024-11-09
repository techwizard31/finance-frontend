"use client";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/Dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

export function DialogDemo({ type, item, price, number }) {
  const [isDialogOpen, setIsDialogOpen] = useState(true);
  const [units, setUnits] = useState(1);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const searchParams = useSearchParams();
  const [round, setRound] = useState(1);

  const handleSubmit = (event) => {
    //event.preventDefault();
    setIsDialogOpen(false);
  };

  // Function to update user state from sessionStorage
  const updateUserFromSessionStorage = () => {
    const userData = sessionStorage.getItem("User");
    setUser(userData ? JSON.parse(userData) : null);
  };

  useEffect(() => {
    updateUserFromSessionStorage();
    const handleStorageChange = (event) => {
      if (event.key === "User") {
        updateUserFromSessionStorage();
      }
    };
    
    // Add event listener for storage changes
    window.addEventListener("storage", handleStorageChange);
    
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(()=>{
    const roundParam = searchParams.get("round");
    setRound(roundParam ? parseInt(roundParam, 10) : 1);
  },[searchParams])
  
  const handleBuy = async () => {
    handleSubmit();
    const token = sessionStorage.getItem("token");
    const userData = sessionStorage.getItem("User");
    setUser(userData ? JSON.parse(userData) : null);
    if (units < 1) {
      return toast.error("Give valid inputs");
    }
    if (number - units * price < 0) {
      return toast.error("You don't have enough points to buy these items");
    }
    setLoading(true);
    setUnits(Number(units));
    console.log(JSON.stringify({
      user: user,
      item: item,
      number: units,
      price: price,
      round: round,
    }))
    const response = await fetch(`api/mongo`, {
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
      
      // Dispatch a custom event after updating sessionStorage
      window.dispatchEvent(new Event("sessionStorageUpdated"));
      setUser(json)
      setUnits(1);
      setLoading(false);
      toast.success("Transaction Successful");
    }    
  };

  const handleSell = async () => {
    handleSubmit();
    const token = sessionStorage.getItem("token");
    if (units < 1) {
      return toast.error("Give valid inputs");
    }
    if (number - units < 0) {
      return toast.error("You don't have that many stocks to sell");
    }
    setLoading(true);
    setUnits(Number(units));

    const response = await fetch(`api/cart`, {
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
      
      // Dispatch a custom event after updating sessionStorage
      window.dispatchEvent(new Event("sessionStorageUpdated"));
      
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