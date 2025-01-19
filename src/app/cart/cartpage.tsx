"use client"
import { Button } from "@/components/ui/button";
import { urlFor } from "@/sanity/lib/image";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import React from "react";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addition, remove, subraction } from "../Redux/features/cart";
// import { addition, delItem, subraction } from "../Redux/features/cart";

const Cartpage = () => {
 
    const dispatch = useDispatch()
 
  const cartArray  = useSelector((state:any) => state.cart);
    
  const handleremove = (id:any)=>{
    dispatch(remove(id))
  }
  
  return (
     <>
          {/* start cart */}
          <div className="w-[95%] sm:w-full flex flex-col md:flex-row justify-center items-start gap-6 ">
          {cartArray.length >= 1 && 
                  <div className="w-full lg:w-[700px] space-y-4 border rounded-[20px] pt-2 ">
                    {cartArray.map((data:any,index:any)=>{
                     return (
                      <div className="flex justify-between border-b px-3 pb-3" key={data.id}>
                       <div className="flex ">
                       <div>
                       <Image src={data.image} alt={data.title} width={100} height={100}></Image>

                            </div>
                            <div className="ml-3">
                                <h1 className="sm:font-bold text-sm md:text-xl" key={index}>{data.name}</h1>
                                <p key={index}>Size:{data.size}</p>
                                <p key={index}>Color:{data.color}</p>
                                <p className="font-bold" key={index}>${data.discount > 0 ? (data.price - (data.price * data.discount) / 100) * data.qty : data.price * data.qty}</p>
                            </div>
                       </div>
                            <div className="relative ">
                            <button onClick={()=>handleremove(data.uuid)} > <MdDelete className="absolute top-0 text-xl right-0 sm:right-3 text-red-500"/></button>
                              <div className="md:w-[100px] h-[40px] flex justify-between p-3 items-center rounded-[62px] bg-[#F0F0F0] text-gray-400 absolute bottom-0 right-0 ">
                              <button onClick={()=>dispatch(subraction(data))} ><Minus/></button>
                             {data.qty}
                              <button  onClick={()=>dispatch(addition(data))}><Plus/></button>
                            </div>
                           </div>
                      </div>
                     )
                    })} 
                  </div>
                   }
          </div>
       
    
     </>
  )
}

export default Cartpage;