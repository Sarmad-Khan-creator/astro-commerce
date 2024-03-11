"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { rating } from "@/constants/constants";
import { createRating } from "@/lib/actions/rating.action";
import { ReviewFormSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { StarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface ReviewModalProps {
  productId: string;
  userId: string;
}

export function ReviewModal({ productId, userId }: ReviewModalProps) {
  const router = useRouter();

  const form = useForm<z.infer<typeof ReviewFormSchema>>({
    resolver: zodResolver(ReviewFormSchema),
    defaultValues: {
      review: "",
      rating: 0,
    },
  });

  const onSubmit = async (values: z.infer<typeof ReviewFormSchema>) => {
    try {
      if (!userId) {
        toast({
          title: "Failed",
          description: "You need to login to do this action",
        });

        return;
      } else {
        await createRating({
          productId: productId,
          userId: userId,
          review: values.review,
          rating: values.rating,
        });

        router.push(`/product/${productId}`);
      }
    } catch (error) {
      throw error;
    }
  };

  const isSubmitting = form.formState.isSubmitting;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-primary-dark hover:bg-primary-hover">
          Write a review
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Write a Review</DialogTitle>
          <DialogDescription>
            What are your reviews about the product?
          </DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                name="review"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Write a review</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="write a detailed review"
                        className="rounded-lg h-[200px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="rating"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex w-full items-center justify-between mt-5">
                        {rating.map((rat) =>
                          field.value >= rat ? (
                            <StarFilledIcon
                              key={rat}
                              onClick={() => form.setValue("rating", rat)}
                              className="cursor-pointer w-[25px] h-[25px] text-yellow-600"
                            />
                          ) : (
                            <StarIcon
                              key={rat}
                              onClick={() => form.setValue("rating", rat)}
                              className="cursor-pointer w-[25px] h-[25px] text-yellow-600"
                            />
                          )
                        )}
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              <DialogFooter className="mt-5">
                <DialogClose>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting" : "Submit"}
                  </Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ReviewModal;
