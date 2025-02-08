
"use client";
import { Button } from "@/components/ui/button";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

let star = [
    <FaStar key={1} />, <FaStar key={2} />, <FaStar key={3} />, <FaStar key={4} />, <FaStar key={5} />,
];

interface Iproducts {
    image: string;
    discountPercent: number;
    isNew: boolean;
    name: string;
    description: string;
    price: number;
    _id: string;
}

export default function Sell() {
    const [products, setProducts] = useState<Iproducts[]>([]);
    const [Loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
              setLoading(true)
                const fetchedProducts = await client.fetch(
                    `*[_type == 'products']{
                        "image": image.asset->url,
                        category,
                        discountPercent,
                        isNew,
                        name,
                        description,
                        price,
                        _id
                    }[0...4]`
                );
                setProducts(fetchedProducts);
                setLoading(false)
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);
    if(Loading){
      return <div className="font-bold flex justify-center items-center mt-10">Loading...</div>
    }
    return (
        <div className="w-full h-full mt-10 lg:mt-36 max-w-screen-xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-center">TOP SELLING</h1>
            <Carousel className="w-full mt-10">
                <CarouselContent className="flex gap-5 lg:gap-0 lg:ml-2">
                    {products.length > 0 ? (
                        products.map((data) => (
                            <CarouselItem key={data._id} className="basis-2/4 lg:basis-1/4">
                                <Link href={`/product/${data._id}`}>
                                    <div className="w-[200px] md:w-[283px] h-[200px] md:h-[290px] bg-[#F0EEED] rounded-[20px]">
                                        {data.image && (
                                            <Image
                                                src={urlFor(data.image).url()}
                                                alt={data.name}
                                                className="w-full h-full rounded-[20px]"
                                                width={100}
                                                height={100}
                                            />
                                        )}
                                    </div>
                                </Link>
                                <div className="pl-2">
                                    <p className="text-lg mt-2 font-bold">{data.name}</p>
                                    <div className="flex text-yellow-400">{star.map((icon, index) => (<span key={index}>{icon}</span>))}</div>
                                    <p className="font-bold mt-1">
                                        {data.price} <span className="text-gray-400 font-bold line-through">{data.discountPercent}</span>
                                    </p>
                                </div>
                            </CarouselItem>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 w-full">No products available at the moment.</p>
                    )}
                </CarouselContent>
            </Carousel>
            <div className="flex justify-center items-start mt-5">
                <Link href="/casual">
                    <Button variant="outline" className="sm:mt-0 w-[80%] sm:w-[200px] rounded-[20px]">View all</Button>
                </Link>
            </div>
        </div>
    );
}
