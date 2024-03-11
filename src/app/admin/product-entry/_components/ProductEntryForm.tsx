"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ProductEntryFormSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { string, z } from "zod";
import Select from "./Select";
import { categories, designers, materials, sizes } from "@/constants/constants";
import { Button } from "@/components/ui/button";
import SelectMultiple from "./SelectMultiple";
import { Loader2, X } from "lucide-react";
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import { createProduct, updateProduct } from "@/lib/actions/product.action";
import { useRouter } from "next/navigation";
import { IProduct } from "@/models/product.model";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

interface Props {
  type?: string;
  productInfo: IProduct;
}

const ProductEntryForm = ({ type, productInfo }: Props) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof ProductEntryFormSchema>>({
    resolver: zodResolver(ProductEntryFormSchema),
    defaultValues: {
      title: productInfo?.title || "",
      description: productInfo?.description || "",
      originalPrice: productInfo?.originalPrice || "",
      discountedPrice: productInfo?.discountedPrice || "",
      stock: productInfo?.inStock || "",
      images: productInfo?.images || [],
      categories: productInfo?.categories || [],
      designers: productInfo?.designers || "",
      materials: productInfo?.materials || "",
      sizes: productInfo?.sizes || [],
      colors: productInfo?.colors || [],
    },
  });

  const handleSelectColors = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: any
  ) => {
    if (e.key === "Enter" && field.name === "colors") {
      e.preventDefault();

      const colorInput = e.target as HTMLInputElement;
      const colorValue = colorInput.value.trim();

      if (colorValue !== "") {
        if (colorValue.length > 15) {
          return form.setError("colors", {
            type: "required",
            message: "Tag must be less than 15 characters.",
          });
        }

        if (!field.value.includes(colorValue as never)) {
          form.setValue("colors", [...field.value, colorValue]);
          colorInput.value = "";
          form.clearErrors("colors");
        }
      } else {
        form.trigger();
      }
    }
  };

  const handleColorRemove = (color: string, field: any) => {
    const newColors = field.value.filter((c: string) => c !== color);

    form.setValue("colors", newColors);
  };

  const onSubmit = async (values: z.infer<typeof ProductEntryFormSchema>) => {
    try {
      if (type === "Edit") {
        await updateProduct(productInfo?._id, {
          title: values.title,
          description: values.description,
          originalPrice: values.originalPrice,
          discountedPrice: values.discountedPrice,
          inStock: values.stock,
          images: values.images,
          categories: values.categories,
          designers: values.designers,
          materials: values.materials,
          sizes: values.sizes,
          colors: values.colors,
          _id: productInfo._id,
        });

        toast({
          title: "Update",
          description: "Product updated successfully",
          variant: "success"
        });
      } else {
        await createProduct({
          title: values.title,
          description: values.description,
          originalPrice: values.originalPrice,
          discountedPrice: values.discountedPrice,
          inStock: values.stock,
          categories: values.categories,
          designers: values.designers,
          materials: values.materials,
          sizes: values.sizes,
          colors: values.colors,
          images: values.images,
        });

        toast({
          title: "Created",
          description: "Product created successfully",
          variant: "success"
        });
      }

      router.push("/admin/dashboard");
    } catch (error) {
      throw error;
    }
  };

  const isSubmitting = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-gray-300 px-16 py-10 rounded-lg mt-10"
      >
        <div className="flex flex-col gap-5">
          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="title"
                    {...field}
                    className="bg-gray-200 focus-visible:ring-0 py-6"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-5 items-center">
            <FormField
              name="originalPrice"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Original Price</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Original Price"
                      {...field}
                      className="bg-gray-200 focus-visible:ring-0 py-6 w-[300px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="discountedPrice"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discounted Price</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Discounted Price"
                      {...field}
                      className="bg-gray-200 focus-visible:ring-0 py-6 w-[300px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-5 items-center">
            <FormField
              name="stock"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>In Stock</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="In Stock"
                      {...field}
                      className="bg-gray-200 focus-visible:ring-0 py-6 w-[300px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="categories"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Select Categories</FormLabel>
                  <FormControl>
                    <SelectMultiple
                      items={categories}
                      form={form}
                      field={field}
                      name="categories"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-5 items-center w-full">
            <FormField
              name="designers"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Select Designers</FormLabel>
                  <FormControl>
                    <Select
                      title="Designers"
                      items={designers}
                      form={form}
                      field={field}
                      name="designers"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="materials"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Select Materials</FormLabel>
                  <FormControl>
                    <Select
                      title="Materials"
                      items={materials}
                      form={form}
                      field={field}
                      name="materials"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-5 items-center">
            <FormField
              name="sizes"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Sizes</FormLabel>
                  <FormControl>
                    <SelectMultiple
                      items={sizes}
                      form={form}
                      field={field}
                      name="sizes"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="colors"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Colors</FormLabel>
                  <FormControl>
                    <>
                      <Input
                        type="text"
                        placeholder="Colors"
                        className="bg-gray-200 focus-visible:ring-0 py-6 w-[300px]"
                        onKeyDown={(e) => handleSelectColors(e, field)}
                      />
                      {field.value.length > 0 && (
                        <div className="w-full flex items-center gap-2">
                          {field.value.map((color) => (
                            <div
                              key={color}
                              className="flex items-center gap-2 bg-gray-200 rounded-lg px-3 py-1"
                            >
                              <p>{color}</p>
                              <X
                                className="w-3 h-3 cursor-pointer"
                                onClick={() => handleColorRemove(color, field)}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Detailed Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Detailed Description"
                    {...field}
                    className="bg-gray-200 focus-visible:ring-0 py-3 h-[250px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="images"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <CldUploadWidget
                  signatureEndpoint="/api/image-sign"
                  onSuccess={(result) => {
                    const info = result.info as CloudinaryUploadWidgetInfo;
                    console.log(info.secure_url);
                    form.setValue("images", [
                      info.secure_url,
                      ...form.getValues("images"),
                    ]);
                  }}
                >
                  {({ open }) => {
                    return (
                      <button
                        onClick={() => open()}
                        className="bg-primary-dark text-white py-2 w-full"
                        type="button"
                        disabled={type === "Edit"}
                      >
                        Upload an Image
                      </button>
                    );
                  }}
                </CldUploadWidget>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end items-center mt-5">
          <Button
            type="submit"
            className="bg-primary-dark px-10 py-5"
            disabled={isSubmitting}
          >
            {type === "Edit"
              ? isSubmitting
                ? "Editing"
                : "Edit"
              : isSubmitting
              ? "Submitting"
              : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProductEntryForm;
