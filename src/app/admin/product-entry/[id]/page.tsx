import React from "react";
import ProductEntryForm from "../_components/ProductEntryForm";
import { getProductById } from "@/lib/actions/product.action";

interface ParamsProps {
  params: { id: string };
}

const EditProduct = async ({ params }: ParamsProps) => {
  const product = await getProductById(params.id);
  return <ProductEntryForm type="Edit" productInfo={product} />;
};

export default EditProduct;
