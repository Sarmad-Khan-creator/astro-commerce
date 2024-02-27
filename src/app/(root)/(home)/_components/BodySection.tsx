import React from "react";
import ShopByCategory from "./ShopByCategory";
import ProductFeatures from "./ProductFeatures";

const BodySection = () => {
  return (
    <section className="mt-16 flex-center flex-col">
      <ShopByCategory />
      <ProductFeatures />
    </section>
  );
};

export default BodySection;
