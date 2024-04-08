import { BsStarFill } from "react-icons/bs";

export default function ReviewCard({ review }) {
  return (
    <div className="border-b py-8">
      <div className="flex gap-2 mb-5">
        <p className="bg-black w-14 h-14 rounded-full font-bold text-white grid place-content-center text-xl">
          {review.name.slice(0, 1)}
        </p>
        <div className="grid">
          <p>{review.name}</p>
          <p className="text-light text-sm">Canada</p>
          <div className="flex text-[12px] mt-2">
            {[...Array(5)].map((star, index) => {
              const ratingVal = index + 1;
              return (
                <div key={index}>
                  <label htmlFor="star" className="cursor-pointer">
                    <BsStarFill
                      className={`${
                        ratingVal <= review.rating
                          ? "text-secondary"
                          : "text-[#cac8c8]"
                      }`}
                    />
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div>
        <p className="font-medium mb-1">{review.title}</p>
        <p className="font-light">{review.message}</p>
      </div>
    </div>
  );
}
