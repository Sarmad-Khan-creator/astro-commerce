import {
  getProductById,
  getProductRating,
  getProductReview,
  getProductSingleRating,
} from "../../../../lib/actions/product.action";
import Image from "next/image";
import Rating from "@/components/shared/Rating";
import { Button } from "@/components/ui/button";
import { HeartIcon } from "lucide-react";
import SingleRating from "@/components/shared/SingleRating";
import ReviewModal from "./_components/ReviewModal";
import { auth } from "@clerk/nextjs";
import { findUserByClerkId } from "@/lib/actions/user.action";
import AddToWishlist from "@/components/shared/AddToWishlist";
import AddToCart from "@/components/shared/AddToCart";
import { getTimestamp } from "@/lib/utils";

const rat = [5, 4, 3, 2, 1];

interface ParamsProps {
  params: {
    id: string;
  };
}

const ProductDetail = async ({ params }: ParamsProps) => {
  const product = await getProductById(params.id);
  const { totalRating } = await getProductRating(params.id);
  const { userId } = auth();
  const user = await findUserByClerkId({ clerkId: userId });
  const singleRating = await getProductSingleRating(params.id);
  const review = await getProductReview(params.id);

  let ratingValue;

  if (totalRating) {
    const rating = totalRating / product.rating.length;
    ratingValue = Math.floor(rating);
  }
  return (
    <main className="mx-28 my-10">
      <h2 className="font-semibold text-lg">{product.title}</h2>
      <section className="flex gap-44 mt-10">
        <div className="flex flex-col gap-5">
          {product.images.map((image: string) => (
            <div key={image} className="relative w-[90px] h-[110px]">
              <Image src={image} alt="product image" fill />
            </div>
          ))}
        </div>
        <div className="w-[350px] h-[450px] relative">
          <Image src={product.images[0]} alt="product image" fill />
        </div>

        <div className="flex flex-col gap-7">
          <h2 className="font-bold text-4xl font-notoSans">{product.title}</h2>
          <p className="font-semibold text-2xl font-notoSans">
            Rs. {product.originalPrice}
          </p>
          <p className="text-secondary-gray w-[500px]">{product.description}</p>
          <Rating ratingValue={ratingValue as number} />
          <div className="flex items-center gap-3">
            <AddToCart
              userId={user._id.toString()}
              productId={product._id.toString()}
              path={`/product/${params.id}`}
            />
            <AddToWishlist
              userId={user._id.toString()}
              productId={product._id.toString()}
              path={`/product/${params.id}`}
            />
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-14 mt-24">
        <div className="flex items-center flex-col justify-center">
          <h2 className="font-bold text-4xl font-notoSans">
            Our Customer{"'"}s Opinion
          </h2>
        </div>

        <div className="flex gap-60">
          <div className="flex flex-col gap-7">
            <h2 className="font-bold text-2xl font-notoSans">Client Reviews</h2>
            <div className="flex gap-2 items-center">
              <p className="font-semibold text-secondary-gray">{ratingValue}</p>
              <Rating ratingValue={ratingValue as number} />
              <p className="text-xs text-secondary-gray">
                Based on {product.rating.length} reviews
              </p>
            </div>
            <div className="mt-5 flex flex-col gap-3">
              {singleRating.map((item) => (
                <SingleRating
                  key={item}
                  value={item.ratingValue.toString()}
                  percent={Number(
                    ((item.count / product.rating.length) * 100).toFixed(1)
                  )}
                />
              ))}
            </div>
            <h3 className="font-semibold text-lg mt-1">
              We value your opinion
            </h3>
            <p className="text-sm text-secondary-gray w-[350px]">
              The time is now for it to be okay to be great. People in this
              world shun people for being great.
            </p>
            <ReviewModal productId={params.id} userId={user._id} />
          </div>

          <div className="flex flex-col gap-7">
            {review?.map((rev) => (
              <div
                key={rev.rating._id}
                className="w-[700px] flex flex-col gap-5 bg-gray-100 p-3 rounded-lg"
              >
                <Rating ratingValue={rev.rating.rating} />
                <p className="text-sm text-secondary-gray">
                  {rev.rating.review}
                </p>
                <div className="flex items-center gap-5">
                  <Image
                    src={rev.user.picture}
                    alt="user picture"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div className="flex flex-col gap-1">
                    <h3 className="text-[14px] font-semibold">
                      {rev.user.name}
                    </h3>
                    <p className="text-xs">{getTimestamp(rev.rating.createdAt)}</p>
                  </div>
                </div>
                <hr />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductDetail;
