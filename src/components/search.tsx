// import React, { useState } from 'react';
// import { Input } from './ui/input';
// import Image from 'next/image';
// import Link from 'next/link';
// import { urlFor } from '@/sanity/lib/image';
// import { FaStar } from 'react-icons/fa';


// // Adding key prop in star array
// let star = [
//     <FaStar key={1} />,
//     <FaStar key={2} />,
//     <FaStar key={3} />,
//     <FaStar key={4} />,
//     <FaStar key={5} />,
// ];

// function Search() {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [products, setProducts] = useState([]);

//   const handleSearch = async (e:any) => {
//     setSearchQuery(e.target.value);

//     // API call to search endpoint
//     try {
//       const response = await fetch(`/api/search?query=${e.target.value}`);
//       const data = await response.json();
//       setProducts(data);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
//   };

//   return (
//     <div>
//       {/* Search Input */}
//       <div className="ml-14 flex justify-center items-center">
//         <Input
//           value={searchQuery}
//           onChange={handleSearch}
//           className="flex justify-start items-center lg:bg-[#F0F0F0] lg:w-[500px] h-[40px] pl-2 ml-12 md:ml-0 hover:border-none rounded-full"
//           type="search"
//           placeholder="Search products..."
//         />
//       </div>

//       {/* Display Search Results */}
//       <div className="mt-5">
//         {products.length > 0 ? (
//           <ul className='flex w-[100wh] bg-red-400 justify-between'>
//             {products.map((data:any,index) => (
//                 <div key={data._id} className="flex-shrink-0">
//                 <Link href={`/product/${data._id}`}>
//                     <div className="w-[200px] md:w-[283px] h-[200px] md:h-[290px] bg-[#F0EEED] rounded-[20px]">
//                         {data.image && (
//                             <Image
//                                 src={data.image}
//                                 alt={data.name}
//                                 className="w-full h-full rounded-[20px]"
//                                 width={100}
//                                 height={100}
//                             />
//                         )}
//                     </div>
//                 </Link>
//                 <div className="pl-2">
//                     <p className="text-lg mt-2 font-bold">{data.name}</p>
//                     <div className="flex text-yellow-400">
//                         {star.map((icon, index) => (
//                             <span key={index}>{icon}</span>
//                         ))}
//                     </div>
//                     <p className="font-bold mt-1">
//                         {data.price}{" "}
//                         <span className="text-gray-400 font-bold line-through">
//                             {data.discountPercent}
//                         </span>
//                     </p>
//                 </div>
//             </div>
//             ))}
//           </ul>
//         ) : (
//           searchQuery && <p>No products found</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Search;
