"use client";
import React from "react";
import { Alert } from "@/components/shared/Alert";
import { DeleteIcon } from "lucide-react";
import { deleteProduct } from "@/lib/actions/product.action";

const DeleteAlert = ({ id }: { id: string }) => {
  const handleDeleteAction = async () => {
    await deleteProduct(id, "/dashboard");
  };
  return (
    <Alert
      title="Are you sure to delete this product?"
      description="Deleting this product will remove it from database. This action cannot be undone"
      onConfirm={handleDeleteAction}
    >
      <div className="p-2 rounded-md bg-red-500 cursor-pointer">
        <DeleteIcon className="invert" />
      </div>
    </Alert>
  );
};

export default DeleteAlert;
