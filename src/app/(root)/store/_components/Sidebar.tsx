"use client";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { categories, designers, materials, sizes } from "@/constants/constants";
import { cn, formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { Check, CheckCircle2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const Sidebar = () => {
  const [showDesigners, setShowDesigners] = useState(false);
  const [showMaterials, setShowMaterials] = useState(false);
  const [showSize, setShowSize] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  const handleCategoryUrl = (value: string) => {
    let newUrl;
    if (searchParams.get("category") === value) {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["category"],
      });
    } else {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "category",
        value: value,
      });
    }

    router.push(newUrl, { scroll: false });
  };

  const handleDesignerUrl = (value: string) => {
    let newUrl;
    if (searchParams.get("designer") === value) {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["designer"],
      });
    } else {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "designer",
        value: value,
      });
    }

    router.push(newUrl, { scroll: false });
  };

  const handleMaterialUrl = (value: string) => {
    let newUrl;
    if (searchParams.get("material") === value) {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["material"],
      });
    } else {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "material",
        value: value,
      });
    }

    router.push(newUrl, { scroll: false });
  };

  const handleSizeUrl = (value: string) => {
    let newUrl;
    if (searchParams.get("size") === value) {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["size"],
      });
    } else {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "size",
        value: value,
      });
    }

    router.push(newUrl, { scroll: false });
  };
  return (
    <section className="w-[300px] flex flex-col gap-7 mt-7">
      <div className="flex flex-col gap-1">
        {categories.map((category) => (
          <p
            key={category.value}
            className={cn(
              "text-[20px] font-semibold text-primary-dark cursor-pointer px-3",
              searchParams.get("category") === category.value &&
                "bg-primary-dark rounded-md py-2 text-white"
            )}
            onClick={() => handleCategoryUrl(category.value)}
          >
            {category.title}
          </p>
        ))}
      </div>

      <div>
        <div
          className="w-full flex-between cursor-pointer max-sm:w-[80%]"
          onClick={() => {
            setShowDesigners((prevValue) => !prevValue);
          }}
        >
          <h2 className="font-semibold text-[20px] text-primary-dark">
            Designers
          </h2>
          {showDesigners ? <MinusIcon /> : <PlusIcon />}
        </div>

        <RadioGroup>
          {showDesigners && (
            <div className="flex flex-col gap-2 ml-8 mt-5">
              {designers.map((designer) => (
                <div
                  className="flex items-center space-x-2 cursor-pointer"
                  key={designer.value}
                  onClick={() => handleDesignerUrl(designer.value)}
                >
                  <RadioGroupItem
                    value={designer.value}
                    id={designer.value}
                    checked={searchParams.get("designer") === designer.value}
                  />
                  <Label htmlFor={designer.value} className="cursor-pointer">
                    {designer.title}
                  </Label>
                </div>
              ))}
            </div>
          )}
        </RadioGroup>
      </div>

      <div>
        <div
          className="w-full flex-between cursor-pointer max-sm:w-[80%]"
          onClick={() => {
            setShowMaterials((prevValue) => !prevValue);
          }}
        >
          <h2 className="font-semibold text-[20px] text-primary-dark">
            Materials
          </h2>
          {showMaterials ? <MinusIcon /> : <PlusIcon />}
        </div>

        <RadioGroup>
          {showMaterials && (
            <div className="flex flex-col gap-2 ml-8 mt-5">
              {materials.map((material) => (
                <div
                  className="flex items-center space-x-2 cursor-pointer"
                  key={material.value}
                  onClick={() => handleMaterialUrl(material.value)}
                >
                  <RadioGroupItem
                    value={material.value}
                    id={material.value}
                    checked={searchParams.get("material") === material.value}
                  />
                  <Label htmlFor={material.value} className="cursor-pointer">
                    {material.title}
                  </Label>
                </div>
              ))}
            </div>
          )}
        </RadioGroup>
      </div>

      <div>
        <div
          className="w-full flex-between cursor-pointer max-sm:w-[80%]"
          onClick={() => {
            setShowSize((prevValue) => !prevValue);
          }}
        >
          <h2 className="font-semibold text-[20px] text-primary-dark">Size</h2>
          {showSize ? <MinusIcon /> : <PlusIcon />}
        </div>

        <RadioGroup>
          {showSize && (
            <div className="flex flex-col gap-2 ml-8 mt-5">
              {sizes.map((size) => (
                <div
                  className="flex items-center space-x-2 cursor-pointer"
                  key={size.value}
                  onClick={() => handleSizeUrl(size.value)}
                >
                  <RadioGroupItem
                    value={size.value}
                    id={size.value}
                    checked={searchParams.get("size") === size.value}
                  />
                  <Label htmlFor={size.value} className="cursor-pointer">{size.title}</Label>
                </div>
              ))}
            </div>
          )}
        </RadioGroup>
      </div>
    </section>
  );
};

export default Sidebar;
