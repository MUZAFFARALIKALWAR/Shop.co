"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

interface Iproducts {
  image: string;
  discountPercent: number;
  isNew: boolean;
  name: string;
  description: string;
  price: number;
  _id: string;
}

// Adding key prop in star array
let star = [
  <FaStar key={1} />,
  <FaStar key={2} />,
  <FaStar key={3} />,
  <FaStar key={4} />,
  <FaStar key={5} />,
];

export default function Shirt() {
  const [products, setProducts] = useState<Iproducts[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts: Iproducts[] = await client.fetch(
          `*[_type == 'products']{
            "image": image.asset->url,
            category,
            discountPercent,
            isNew,
            name,
            description,
            price,
            _id
          }[0...9]`
        );
        setProducts(fetchedProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <p className="text-lg font-bold">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <p className="text-lg font-bold text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full ">
      <h1 className="text-[25px] font-bold relative pl-5">
        Casual
        <span className="text-sm font-bold flex items-center justify-center absolute right-10 top-2">
          Most Popular <RiArrowDropDownLine />
        </span>
      </h1>
      <div className="grid gap-3 grid-cols-2 xl:grid-cols-3  md:p-0 place-items-center">
        {products.map((data, index) => (
          <div className=" mt-1" key={index}>
            <Link href={`/product/${data._id}`}>
              <div className="w-[160px] md:w-[240px] lg:w-[290px] h-[160px] md:h-[240px] lg:h-[290px] bg-[#F0EEED] rounded-[20px]">
                <Image
                  src={urlFor(data.image).url()}
                  alt={data.name}
                  className="w-full h-full rounded-[20px]"
                  width={100}
                  height={100}
                />
              </div>
            </Link>
            <div>
              <p className="text-sm md:text-lg mt-2 font-bold">{data.name}</p>
              <div className="flex text-yellow-400">
                {star.map((icon, index) => (
                  <span key={index}>{icon}</span>
                ))}
              </div>
              <p className="font-bold mt-1">
                ${data.price}
                {data.discountPercent > 0 && (
                  <span className="text-gray-400 font-bold line-through ml-2">
                    ${((data.price * (100 - data.discountPercent)) / 100).toFixed(2)}
                  </span>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
