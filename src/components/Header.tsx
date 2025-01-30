"use client"
import Link from "next/link";
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdOutlineAccountCircle } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { SheetSide } from "./Humburgur";
import { NavigationMenuDemo } from "./navigationMenu";
import { useSelector } from "react-redux";
import AnnouncementBar from "./AnnouncementBar";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function Header() {
  const cart =  useSelector((state:any)=>state.cart)

  return (
    <>
    <div className="fixed z-10 top-0 w-full">
    <AnnouncementBar/>
     <header className="w-full  border-b bg-white h-[60px] md:h-[90px] flex justify-between  pr-2 items-center max-w-screen-2xl mx-auto">
           <div className="flex justify-center items-center">
           <SheetSide/>
            {/* logo */}
            <h1 className="text-2xl md:text-4xl font-extrabold pl-2">SHOP.CO</h1>
           </div>
            {/* navigation bar */}
            <ul className="hidden xl:block ">
                <li className="flex space-x-4 ml-4 mt-2 items-center ">
                    
                
                    <Link href={``}><NavigationMenuDemo/></Link>
                    <Link href={`/sell`}>On Sale</Link>
                    <Link href={"/product"}>New Arrivals</Link>
                    <Link href={"/brands"}>Brands</Link>
                </li>
            </ul>
            {/* right */}
            {/* <Search/> */}
             <div className="flex justify-start items-center lg:bg-[#F0F0F0] lg:w-[500px] h-[40px] pl-2 ml-12 md:ml-0 hover:border-none rounded-full "> <IoIosSearch className="text-xl " /> <input   placeholder={`Search for products...`}  className="bg-[#F0F0F0] outline-none  w-full h-full rounded-full ml-2  "/></div>

            <div className="flex space-x-2 sm:space-x-4 items-center">
            {/* <IoIosSearch className="text-4xl  lg:hidden" /> */}
            <Link href={"/cart"} className="relative">
            <IoCartOutline className="text-4xl "/>
            {cart.length > 0 && (
                <span className="absolute top-[-5px] bg-red-400  rounded-full text-white w-[20px] h-[20px] flex justify-center items-center p-1 text-sm right-0">{cart.length}</span>
             )

             }            </Link>
            {/* <MdOutlineAccountCircle className="text-4xl "/> */}
            <SignedOut>
            <SignInButton>
              <h1 className="text-red-500 cursor-pointer">Login/Register</h1>
            </SignInButton>
          </SignedOut>
          <SignedIn >
            <UserButton />
          </SignedIn> 
        
          
            
            </div>
         
         {/* </div> */}
     </header>
     </div>
     </>
  );
}
