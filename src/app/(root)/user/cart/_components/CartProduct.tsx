"use client";
import { IProduct } from "@/models/product.model";
import Image from "next/image";
import React, { useState } from "react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { updateCartProductQuantity } from "@/lib/actions/cart.action";

interface CartProductProps {
  product: IProduct;
  quantity: number;
}

const CartProduct = ({ product, quantity }: CartProductProps) => {
  const [value, setValue] = useState(quantity);
  const QuantityFormSchema = z.object({
    quantity: z.number(),
  });

  const form = useForm<z.infer<typeof QuantityFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(QuantityFormSchema),
    defaultValues: {
      quantity: 1,
    },
  });

  const updateProduct = async (value: number) => {
    try {
      await updateCartProductQuantity(product._id, value);
    } catch (error) {
      throw error;
    }
  };

  const onChange = (value: number) => {
    if (value < 1) {
      setValue(1);
    } else {
      setValue(value);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3 flex-1">
        <div className="relative w-[70px] h-[90px]">
          <Image src={product.images[0]} alt="product image" fill />
        </div>
        <h3 className="font-semibold">{product.title}</h3>
      </div>
      <p className="text-secondary-gray flex-1">Rs. {product.originalPrice}</p>
      <Form {...form}>
        <form className="flex-1">
          <FormField
            name="quantity"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    value={value}
                    onChangeCapture={(e) =>
                      onChange(Number(e.currentTarget.value))
                    }
                    className="w-[60px]"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
      <p className="text-secondary-gray flex-1">
        Rs. {value * Number(product.originalPrice)}
      </p>
      <div className="flex-1">
        <Button
          className="bg-primary-dark hover:bg-primary-hover"
          onClick={() => updateProduct(value)}
        >
          Update
        </Button>
      </div>
    </div>
  );
};

export default CartProduct;
