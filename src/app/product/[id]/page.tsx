"use client";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import CustomerTestimonials from "@/components/AllReviews";
import Top_sell from "@/components/arrivals";
import { BreadcrumbCollapsed } from "@/components/Breadcrupm";
import { useDispatch } from "react-redux";
import Toastify from "@/app/cart/toastify";

// Adding key prop in star array
let star = [
  <FaStar key={1} />,
  <FaStar key={2} />,
  <FaStar key={3} />,
  <FaStar key={4} />,
  <FaStar key={5} />,
];

interface Iproducts {
  image: string[];
  discountPercent: number;
  isNew: boolean;
  name: string;
  description: string;
  price: number;
  _id: string;
  colors: string[];
  sizes: string[];
}

export default function SlugPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Iproducts | null>(null);
  const [cartItem, setCartItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
   const disispatch = useDispatch()
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const products: Iproducts[] = await client.fetch(
          `*[_type == 'products']{
            "image": image.asset->url,
            category,
            discountPercent,
            isNew,
            name,
            description,
            price,
            _id,
            colors,
            sizes  
          }`
        );

        const slug = products.find((item) => item._id === params.id);

        if (!slug) {
          setError(true);
        } else {
          setProduct(slug);
          setCartItem({
            id: slug._id,
            name: slug.name,
            image: slug.image,
            price: slug.price,
            size: slug.sizes[0],
            color: slug.colors[0],
            qty: 1,
            discount: slug.discountPercent,
          });
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);
                 
 
  if (loading) {
    return <h1 className="text-center mt-28 font-bold">Loading...</h1>;
  }

  if (error || !product) {
    return <h1 className="mt-28 text-center font-bold">Product not found</h1>;
  }

       
  return (
    <>
    <div className="mt-28 md:mt-36">
       <BreadcrumbCollapsed/>
      <div className="flex h-full items-center flex-col md:flex-row justify-center sm:justify-evenly  sm:p-0 max-w-screen-2xl mx-auto">
        {/* Left */}
        <div className="flex space-x-4 md:space-x-0  md:space-y-3 p-5 md:flex-col justify-between items-center md:w-[200px]  order-2 md:order-1">
          {product.image &&
            <Image
              key={product._id}
              src={urlFor(product.image).url()}
              className="w-[100px]  h-[100px] md:h-[150px] lg:mt-3 rounded-[20px]"
              alt={product.name}
              width={100}
              height={100}
            />
          }
          {product.image &&
            <Image
              key={product._id}
              src={urlFor(product.image).url()}
              className="w-[100px]  h-[100px] md:h-[150px] lg:mt-3 rounded-[20px]"
              alt={product.name}
              width={100}
              height={100}
            />
          }
          {product.image &&
            <Image
              key={product._id}
              src={urlFor(product.image).url()}
              className="w-[100px]  h-[100px] md:h-[150px] lg:mt-3 rounded-[20px]"
              alt={product.name}
              width={100}
              height={100}
            />
          }
        </div>
        {/* Mid */}
        <div className="w-[90%] pb-3  h-[260px] lg:w-[500px] md:h-[500px] mt-5 lg:mt-0 order-1 md::order-2">
        {product.image &&
            <Image
              key={product._id}
              src={urlFor(product.image).url()}
              className=" w-full h-full sm:mt-3 rounded-[20px]"
              alt={product.name}
              width={100}
              height={100}
            />
          }
        </div>
        {/* Right */}
        <div className="w-full p-5 lg:w-[500px] lg:h-[500px]  order-3">
          <h1 className="text-2xl lg:text-3xl font-bold">{cartItem.name}</h1>
          <div className="flex text-yellow-400">{star}</div>
          <div className="flex items-center space-x-2">
            <p className="font-bold">{cartItem.price * cartItem.qty}</p>
            {cartItem.discount > 0 && (
              <span className="text-gray-400 line-through">
                {(cartItem.price - (cartItem.price * cartItem.discount) / 100) *
                  cartItem.qty}
              </span>
            )}
            {cartItem.discount > 0 && (
              <span className="bg-red-400 rounded-[10px]">{`-${cartItem.discount}%`}</span>
            )}
          </div>
          <p className="text-sm">{product.description}</p>
          {/* Select Color */}
          <div className="mt-5">
            <p className="text-gray-500">Select Colors</p>
            <div className="flex space-x-3 mt-2">
              {product.colors.map((color, i) => (
                <button
                  key={i}
                  onClick={() => setCartItem({ ...cartItem, color })}
                  className="w-[37px] h-[37px] border border-black active:outline rounded-full flex justify-center items-center"
                  style={{ backgroundColor: color }}
                ></button>
              ))}
            </div>
          </div>
          {/* Choose Size */}
          <div className="mt-4">
            <p className="text-gray-500">Choose Size</p>
            <div className="flex space-x-3 mt-2">
              {product.sizes.map((size, i) => (
                <button
                  key={i}
                  onClick={() => setCartItem({ ...cartItem, size })}
                  className="w-[80px] h-[40px] flex justify-center items-center active:outline rounded-[62px] bg-[#F0F0F0] text-gray-400"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          {/* Quantity & Add to Cart */}
          <div className="flex justify-start items-center mt-7 space-x-4">
            <button
              onClick={() =>
                setCartItem({
                  ...cartItem,
                  qty: cartItem.qty <= 1 ? 1 : --cartItem.qty,
                })
              }
            >
              <Minus />
            </button>
            <span>{cartItem.qty}</span>
            <button
              onClick={() =>
                setCartItem({ ...cartItem, qty: ++cartItem.qty })
              }
            >
              <Plus />
            </button>
            {/* <Button onClick={()=>handleadd(cartItem)} className="bg-black text-white w-[300px]">Add to Cart</Button> */}
            <Toastify cartItem = {cartItem}/>
          </div>
        </div>
      </div>
    </div>
      <CustomerTestimonials/>
      <Top_sell/>
    </>
  );
}
