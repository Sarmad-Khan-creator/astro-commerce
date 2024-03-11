"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CheckoutFormSchema } from "@/lib/validation";
import { IUser } from "@/models/user.model";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const CheckoutForm = ({ user }: { user: IUser }) => {
  const form = useForm<z.infer<typeof CheckoutFormSchema>>({
    resolver: zodResolver(CheckoutFormSchema),
    defaultValues: {
      email: "" || user.email,
      nameOnCard: "",
      cardNumber: 0,
      expiryDate: "",
      cvc: 0,
      address: "" || user.address,
    },
  });

  const onSubmit = async (data: any) => {};
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
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
            <FormItem className="w-full">
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
            <FormItem className="w-full">
              <FormLabel className="text-primary-dark">Card Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="0000 0000 0000 0000"
                  {...field}
                  className="border border-secondary-gray h-[45px]"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex items-center gap-5">
          <FormField
            name="expiryDate"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
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
              <FormItem className="w-full">
                <FormLabel className="text-primary-dark">CVC</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter three digit number"
                    {...field}
                    className="border border-secondary-gray h-[45px]"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <FormField
          name="address"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
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
        <Button className="bg-primary-dark hover:bg-primary-hover">Pay</Button>
      </form>
    </Form>
  );
};

export default CheckoutForm;
