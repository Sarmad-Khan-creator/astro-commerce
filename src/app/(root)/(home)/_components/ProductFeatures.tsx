import Image from "next/image";
import React from "react";

const ProductFeatures = () => {
  return (
    <section className="mt-28 flex-center flex flex-col gap-24">
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-primary-dark font-semibold text-[30px]">
          Product Features
        </h2>
        <p className="text-center w-[650px] text-[18px] text-secondary-gray font-notoSans">
          Society has put up so many boundaries, so many limitations on what’s
          right and wrong that it’s almost impossible
        </p>
      </div>

      <div className="w-full gap-x-5 gap-y-5 grid grid-rows-2 grid-cols-5">
        <div className="row-span-2 col-span-3 flex flex-col gap-3">
          <h3 className="text-[24px] font-semibold text-primary-dark">
            Product Description
          </h3>
          <p className="text-[16px] text-secondary-gray font-normal w-[550px] leading-7">
            Society has put up so many boundaries, so many limitations on what’s
            right and wrong that it’s almost impossible to get a pure thought
            out. It’s like a little kid, a little boy, looking at colors, and no
            one told him what colors are good, before somebody tells you you
            shouldn’t like pink because that’s for girls, or you’d instantly
            become a gay two-year-old.
          </p>
          <ul className="w-[550px] mt-10 text-secondary-gray h-full flex-between flex-col">
            <li>
              <p>
                Oil is a primary source of energy for various sectors, including
                transportation, industries, and residential use.
              </p>
            </li>
            <li>
              <p>
                Oil is highly versatile and used in the production of a wide
                range of products. It serves as a raw material for manufacturing
                plastics
              </p>
            </li>
            <li>
              <p>
                Oil is a crucial source of petrochemicals, which are used in the
                production of plastics.
              </p>
            </li>
          </ul>
        </div>
        <div className="w-[420px] h-[216px] col-span-2 row-span-1 relative">
          <Image
            src="/images/oil-image-1.jpg"
            alt="oil image 1"
            fill
            className="rounded-lg"
          />
        </div>
        <div className="col-span-1 row-span-1 relative">
          <Image
            src="/images/oil-image-2.jpg"
            alt="oil image 2"
            fill
            className="rounded-lg"
          />
        </div>
        <div className="col-span-1 row-span-1 relative">
          <Image
            src="/images/oil-image-3.jpg"
            alt="oil image 2"
            fill
            className="rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default ProductFeatures;
