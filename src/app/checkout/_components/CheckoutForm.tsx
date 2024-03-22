"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { placeOrder } from "@/lib/actions/order.action";
import { CheckoutFormSchema } from "@/lib/validation";
import { IProduct } from "@/models/product.model";
import { IUser } from "@/models/user.model";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const CheckoutForm = ({ user, products }: { user: IUser; products: any[] }) => {
  const proId = products.filter((product) => product._id);
  const router = useRouter()
  const form = useForm<z.infer<typeof CheckoutFormSchema>>({
    resolver: zodResolver(CheckoutFormSchema),
    defaultValues: {
      email: "" || user.email,
      nameOnCard: "",
      cardNumber: "",
      expiryDate: "",
      cvc: "",
      address: "" || user.address,
    },
  });

  const onSubmit = async (values: z.infer<typeof CheckoutFormSchema>) => {
    try {
      // @ts-ignore
      await placeOrder({
        product: proId,
        user: user && user.id,
        quantity: 1,
        name: values.nameOnCard,
        email: values.email,
        address: values.address,
      }, user._id);

      toast({
        title: "Success",
        description: "Order placed successfully",
        variant: "success",
      })

      router.push("/user/cart")
    } catch (error) {
      toast({
        title: "Failed",
        description: "Something wrong. Order cannot be place",
        variant: "destructive",
      });
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5 max-sm:mx-5"
      >
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full max-sm:w-[350px]">
              <FormLabel className="text-primary-dark">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your email"
                  {...field}
                  className="border border-secondary-gray h-[45px]"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="nameOnCard"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full max-sm:w-[350px]">
              <FormLabel className="text-primary-dark">Name on Card</FormLabel>
              <FormControl>
                <Input
                  placeholder="john Doe"
                  {...field}
                  className="border border-secondary-gray h-[45px]"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="cardNumber"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full max-sm:w-[350px]">
              <FormLabel className="text-primary-dark">Card Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="0000 0000 0000 0000"
                  {...field}
                  className="border border-secondary-gray h-[45px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center gap-5 max-sm:flex-col max-sm:items-start">
          <FormField
            name="expiryDate"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full max-sm:w-[350px]">
                <FormLabel className="text-primary-dark">Expiry Date</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the Date"
                    {...field}
                    className="border border-secondary-gray h-[45px]"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="cvc"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full max-sm:w-[350px]">
                <FormLabel className="text-primary-dark">CVC</FormLabel>
                <FormControl>
                  <Input
                  type="number"
                    placeholder="Enter three digit number"
                    {...field}
                    className="border border-secondary-gray h-[45px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          name="address"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full max-sm:w-[350px]">
              <FormLabel className="text-primary-dark">Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="Street no,"
                  {...field}
                  className="border border-secondary-gray h-[45px]"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="bg-primary-dark hover:bg-primary-hover max-sm:w-[350px] max-sm:mb-5">Pay</Button>
      </form>
    </Form>
  );
};

export default CheckoutForm;
