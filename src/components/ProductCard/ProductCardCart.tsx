import React from "react";
import Link from "next/link";
import { InCartAdder } from "../CartAdder/CartAdder";
import {ICartItem} from "@/types/product.types";
type Props = {
    item: ICartItem;
}
const ProductCardCart = ({ item }:Props) => {
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-slate-100 rounded-2xl p-4 shadow-sm group">

            {/* Картинка и Название */}
            <Link href={`/Product/${item.product.id}`} className="flex items-center gap-4 flex-1">
                <div className="w-20 h-20 bg-slate-100 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center text-2xl">
                    {item.product.images?.[0] ? (
                        <img src={item.product.images[0]} alt={item.product.title} className="w-full h-full object-cover" />
                    ) : "📦"}
                </div>
                <div>
                    <h3 className="text-base font-semibold text-slate-800 line-clamp-2 leading-snug">
                        {item.product.title}
                    </h3>
                    <span className="text-xs text-slate-400 font-mono block mt-1">Арт: {item.product.sku}</span>
                </div>
            </Link>

            <InCartAdder item={item} />

        </div>
    );
};

export default ProductCardCart;
