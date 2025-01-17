
import { BreadcrumbCollapsed } from "@/components/Breadcrupm";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import React from "react";
import { MdDelete } from "react-icons/md";

const Cart = () => {
  const cartItems = [
    {
      id: 1,
      name: "Gradient Graphic T-shirt",
      size: "Large",
      color: "White",
      price: 145,
      image: "/detail1.png", // Add images in the public folder
    },
    {
      id: 2,
      name: "Checkered Shirt",
      size: "Medium",
      color: "Red",
      price: 180,
      image: "/detail3.png",
    },
    {
      id: 3,
      name: "Skinny Fit Jeans",
      size: "Large",
      color: "Blue",
      price: 240,
      image: "/detail2.png",
    },
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const discount = subtotal * 0.2;
  const deliveryFee = 15;
  const total = subtotal - discount + deliveryFee;

  return (
       <div className="flex flex-col justify-center items-center  max-w-screen-2xl  mx-auto relative"> 
         <span className="absolute top-0 left-0">
         <BreadcrumbCollapsed/> 
         </span>
          <div className="w-[95%] max-w-[1200px] mt-10">
          <h1 className="text-2xl md:text-3xl font-bold pl-2">Your cart</h1>
          </div>
          {/* start cart */}
          <div className="w-[95%] sm:w-full flex flex-col md:flex-row justify-center items-start gap-6 mt-4">
                  <div className="w-full lg:w-[700px] space-y-4 border rounded-[20px] pt-2 ">
                    {cartItems.map((data,index)=>{
                     return (
                      <div className="flex justify-between border-b px-3 pb-3" key={data.id}>
                       <div className="flex ">
                       <div>
                             <Image src={data.image} width={100} height={100}  alt={data.name}></Image>
                            </div>
                            <div className="ml-3">
                                <h1 className="font-bold" key={index}>{data.name}</h1>
                                <p key={index}>Size:{data.size}</p>
                                <p key={index}>Color:{data.color}</p>
                                <p className="font-bold" key={index}>${data.price}</p>
                            </div>
                       </div>
                            <div className="relative ">
                              <MdDelete className="absolute top-0 text-xl right-0 sm:right-3 text-red-500"/>
                              <div className="md:w-[100px] h-[40px] flex justify-between p-3 items-center rounded-[62px] bg-[#F0F0F0] text-gray-400 absolute bottom-0 right-0 ">
                                <Minus/>
                                1
                                <Plus/>
                             </div>
                            </div>
                      </div>
                     )
                    })}
                  </div>
                  {/* right */}
                    {/* Order Summary */}
                         <div className="bg-white p-4 w-full lg:w-[500px] border rounded-[20px]">
                             <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                             <div className="space-y-2">
                               <div className="flex justify-between">
                                 <p>Subtotal</p>
                                 <p>${subtotal}</p>
                               </div>
                               <div className="flex justify-between">
                                 <p>Discount (-20%)</p>
                                 <p>-${discount.toFixed(2)}</p>
                               </div>
                               <div className="flex justify-between">
                                 <p>Delivery Fee</p>
                                 <p>${deliveryFee}</p>
                               </div>
                               <div className="border-t pt-2 flex justify-between font-bold">
                                 <p>Total</p>
                                 <p>${total.toFixed(2)}</p>
                               </div>
                               <div className="flex justify-between items-center">
                                <input className="h-10 rounded-[6px] bg-[#F0F0F0] px-4 w-[200px] md:w-[360px] border-none" type="search" placeholder="Add promo code" />
                                <Button className="w-[100px] rounded-[20px]">Apply</Button>
                               </div>
                             </div>
                             <button className="w-full mt-4 bg-black text-white py-2 rounded-md">
                               Go to Checkout
                             </button>
                         </div>
          </div>
       </div>
  )
}

export default Cart;
