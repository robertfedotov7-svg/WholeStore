import React from "react";
import {IProduct} from "@/types/product.types";

interface ProductCardAdminProps {
    product: IProduct;
}

const ProductCardAdmin = ({ product }: ProductCardAdminProps) => {
    return (
        <tr className="hover:bg-slate-50/50 transition-colors">
            <td className="px-6 py-4 font-medium text-slate-900">{product.title}</td>
            <td className="px-6 py-4">{product.category}</td>
            <td className="px-6 py-4 font-semibold text-slate-900">{product.price} {product.currency}</td>
            <td className="px-6 py-4 font-semibold text-slate-900">{product.oldPrice} {product.currency}</td>
            <td className={`px-6 py-4 text-green-600 font-medium ${product.quantity > 0 ? "text-green-600" : "text-red-600"}`}>{product.quantity} шт.</td>
            <td className="px-6 py-4 text-right space-x-3 text-xs font-semibold">
                <button className="text-blue-600 hover:text-blue-800">Редактировать</button>
                <button className="text-red-600 hover:text-red-800">Удалить</button>
            </td>
        </tr>
    )
}

export default ProductCardAdmin;