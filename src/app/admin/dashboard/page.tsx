import Alert from "@/components/shared/Alert";
import { getAllProducts } from "@/lib/actions/product.action";
import { DeleteIcon, Edit2Icon, EditIcon } from "lucide-react";
import Image from "next/image";
import DeleteAlert from "../_components/DeleteAlert";
import Link from "next/link";

const Dashboard = async () => {
  const products = await getAllProducts({});

  return (
    <div className="mt-4 mx-7 w-full">
      <div className="flex flex-col gap-3">
        <div className="w-full flex">
          <h2 className="flex-1 font-semibold text-lg">Product Id</h2>
          <h2 className="flex-1 font-semibold text-lg">Image</h2>
          <h2 className="flex-1 font-semibold text-lg">Title</h2>
          <h2 className="flex-1 font-semibold text-lg">Original Price</h2>
          <h2 className="flex-1 font-semibold text-lg">Discounted Price</h2>
          <h2 className="flex-1 font-semibold text-lg">Actions</h2>
        </div>
        {products.map((product) => (
          <div className="w-full flex" key={product._id}>
            <p className="flex-1 text-xs">{product._id}</p>
            <div className="flex-1">
              <div className="w-[50px] h-[50px] relative">
                <Image src={product.images[0]} alt="product image" fill />
              </div>
            </div>
            <p className="flex-1">{product.title}</p>
            <p className="flex-1">{product.originalPrice}</p>
            <p className="flex-1">{product.discountedPrice}</p>
            <div className="flex flex-1 items-center gap-2">
              <DeleteAlert id={product._id} />
              <div className="p-2 rounded-md bg-blue-500 cursor-pointer">
                <Link href={`/admin/product-entry/${product._id}`}>
                  <EditIcon className="invert" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
