import React from "react";
import Link from 'next/link';
import { IProduct } from "@/types/product.types";


type Props = {
    product: IProduct;
}

const ProductCard = ({product}: Props) => {

    return (

        <Link href={`/product/${product.id}/`} className={`bg-white h-full border border-slate-100 rounded-2xl p-4 flex flex-col group transition-all duration-300 hover:shadow-md`}>
            {/* Фото */}
            <div className="w-full aspect-square bg-slate-100 rounded-xl flex items-center justify-center text-3xl mb-4 group-hover:scale-[1.02] transition-transform duration-300 overflow-hidden">
                <img src={product.images[0]} alt=" " className="w-full h-full object-cover" />
            </div>

            {/* Название */}
            <h3 className="text-base font-semibold text-slate-800 line-clamp-2 mb-2 min-h-[3rem] leading-snug">
                {product.title}
            </h3>

            {/* Цена и кнопка */}
            <div className="mt-auto pt-2 flex flex-col gap-3">
                <div className="flex flex-col">
                    {/* Старая цена (если есть) */}
                    {product.oldPrice ? <span className="text-xs text-slate-400 line-through">{product.oldPrice} {product.currency}</span> : "" }
                    <span className="text-lg font-bold text-blue-600">{product.price} {product.currency}</span>

                </div>

                <button className="w-full py-2 px-4 bg-slate-900 text-white font-medium text-sm rounded-xl hover:bg-slate-800 active:scale-98 transition-all">
                    Подробнее
                </button>
            </div>
        </Link>
    )
}
export default ProductCard