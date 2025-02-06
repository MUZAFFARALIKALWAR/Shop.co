import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { StarIcon } from 'lucide-react';
import { client } from '@/sanity/lib/client';
import { FaStar } from 'react-icons/fa';

interface Review {
  _id?: string;
  _type: 'review';
  name: string;
  review: string;
  rating: number;
}

interface StarRatingProps {
  rating: number;
  setRating: (rating: number) => void;
}

const StarRating = ({ rating, setRating }: StarRatingProps) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <button
            type="button"
            key={starValue}
            onClick={() => setRating(starValue)}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
            className="text-3xl"
          >
            <StarIcon
              className="w-8 h-8"
              fill={starValue <= (hover || rating) ? '#ebbd26' : 'none'}
            />
          </button>
        );
      })}
    </div>
  );
};

export default function ReviewForm() {
  const [name, setName] = useState('');
  const [review, setReview] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  // Fetch reviews from Sanity on mount
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const fetchedReviews: Review[] = await client.fetch(
         ` *[_type == "review"] | order(_createdAt desc)`
        );
        setReviews(fetchedReviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !review || rating === 0) {
      alert('Please fill in all fields and provide a rating.');
      return;
    }

    const doc: Review = {
      _type: 'review',
      name,
      review,
      rating,
    };

    try {
      const newReview = await client.create(doc);

      // Update state with new review from Sanity
      setReviews((prevReviews) => [newReview, ...prevReviews]);

      // Store the user's name in localStorage so they can delete their own reviews
      localStorage.setItem('currentUser', name);
      setCurrentUser(name);

      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setName('');
      setReview('');
      setRating(0);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const handleDelete = async (reviewId: string) => {
    try {
      await client.delete(reviewId);
      setReviews((prevReviews) => prevReviews.filter((rev) => rev._id !== reviewId));
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };
  return (
    <div className="w-full  ">
         <h2 className="text-3xl font-bold text-gray-800  ml-7">Leave a Review</h2>
      <div className="bg-white  rounded-lg p-8   lg:flex justify-between items-start ">
       
        {submitted ? (
          <div className='h-screen lg:ml-6 flex justify-center items-center'>
            <p className="text-green-600 font-medium text-lg">Thank you for your review!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 border rounded-lg lg:w-[70%] p-5">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium text-lg">
                Your Name:
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                required
                className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg text-lg focus:ring focus:ring-blue-200"
              />
            </div>
            <div>
              <label htmlFor="review" className="block text-gray-700 font-medium text-lg">
                Your Review:
              </label>
              <textarea
                id="review"
                value={review}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setReview(e.target.value)}
                required
                className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg text-lg focus:ring focus:ring-blue-200"
              />
            </div>
            <div>
              <p className="text-gray-700 font-bold mb-4 text-xl">Rating:</p>
              <StarRating  rating={rating} setRating={setRating} />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 px-5 rounded-lg text-lg hover:bg-blue-600 transition"
            >
              Submit Review
            </button>
          </form>
        )}
        <div className="mt-8 lg:mt-0 lg:ml-3 lg:w-[50%] p-5 border rounded-lg">
          <h3 className="text-2xl font-semibold text-gray-800">Reviews</h3>
          {reviews.length > 0 ? (
            <ul className="mt-6 space-y-4">
              {reviews.map((rev) => (
                <li key={rev._id} className="py-2 px-4 border border-gray-300 rounded-lg shadow-lg">
                  <div className="flex flex-col  items-start ">
                  <div className="flex">
                      {[...Array(5)].map((_, i) => (
                       <div  key={i}>
                         <FaStar
                          key={i}
                          className="text-yellow-400"
                        /> 
                       </div>
                      ))}
                    </div>
                    <p className="font-semibold text-lg">{rev.name}</p>
                   
                  </div>
                  <p className="text-lg text-gray-700">{rev.review}</p>

                  {/* Show delete button only if the current user matches the review's name */}
                  {currentUser === rev.name && rev._id && (
                    <button
                      onClick={() => handleDelete(rev._id!)}
                      className="mt-2 text-red-500 hover:text-red-700 transition"
                    >
                      Delete Review
                    </button>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 my-8 text-lg">No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}