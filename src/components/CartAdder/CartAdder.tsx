'use client';
import { AnimatePresence, motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import { Input } from "antd";
import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { ICartItem, IProduct } from "@/types/product.types";

interface CartAdderProps {
    product: IProduct;
}

export function CartAdder({ product }: CartAdderProps) {
    const { cartItems, dispatch } = useApp();
    // Изменили тип на string | number, чтобы Antd Input работал адекватно
    const [customQuantity, setCustomQuantity] = useState<string>("");
    const [quantity, setQuantity] = useState<number>(1);

    const currentCartItem = cartItems.find(item => item.product?.id === product?.id);

    const handleAddCart = () => {
        dispatch({
            type: 'ADD_ITEM',
            payload: { product, quantity }
        });
    };

    const handleQuantityChange = (type: any) => {
        if (!currentCartItem) return;
        dispatch({
            type: 'UPDATE_QUANTITY',
            payload: { productId: product.id, type }
        });
    };

    const handleRemoveItem = () => {
        dispatch({
            type: 'REMOVE_ITEM',
            payload: { productId: product.id }
        });
    };

    // Безопасное приведение валюты к строке, если это вдруг объект
    const renderCurrency = (curr: any) => {
        if (!curr) return "₽";
        if (typeof curr === "object") return curr.symbol || curr.code || "₽";
        return curr;
    };

    const foundItem = cartItems.find((p) => p.product?.id === product?.id);

    return (
        <AnimatePresence mode="wait">
            {foundItem ? (
                <motion.div
                    key="in-cart"
                    initial={{ y: -30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 30, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                >
                    <div className="mb-2 flex justify-center gap-30 items-center border border-slate-200 rounded-xl bg-slate-50">
                        <div className="flex justify-center gap-10 items-center">
                            <button
                                onClick={() => handleQuantityChange("−")}
                                className="px-3 py-1.5 text-slate-500 hover:bg-slate-200 active:bg-slate-300 font-semibold transition-colors"
                            >
                                −
                            </button>
                            <span className="px-3 py-1.5 text-sm font-bold text-slate-800 select-none min-w-[2.5rem] text-center">
                                {foundItem.quantity}
                            </span>
                            <button
                                onClick={() => handleQuantityChange("+")}
                                className="px-3 py-1.5 text-slate-500 hover:bg-slate-200 active:bg-slate-300 font-semibold transition-colors"
                            >
                                +
                            </button>
                        </div>
                        <div className="flex justify-center items-center" >
                            <button
                                onClick={handleRemoveItem}
                                className="hover:text-red-500 hover:scale-120 active:scale-100 transition duration-200 ease-in-out flex items-center gap-2"
                            >
                                <Trash2 />
                            </button>
                        </div>
                    </div>
                    <Link href="/cart" className="flex justify-center gap-10 items-center py-4 border border-green-200 rounded-xl bg-green-50">
                        Перейти в корзину
                    </Link>
                </motion.div>
            ) : (
                product?.isAvailable ? (
                    <motion.div
                        key="add-cart"
                        initial={{ y: -30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 30, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        <div className="flex justify-between items-center mb-5">
                            {[1, 10, 100, 1000, 10000].map(item => (
                                <label key={item} className={`hover:scale-102 transition flex items-center justify-center gap-2 border border-blue-700 rounded-xl h-15 px-4 ${quantity === item ? "bg-green-50 border-green-700" : "bg-blue-50 border-blue-700"}`}>
                                    <input
                                        type="radio"
                                        className="checked:accent-green-700 transition"
                                        checked={quantity === item}
                                        onChange={() => setQuantity(item)}
                                    />
                                    <p className="text-center">{item}</p>
                                </label>
                            ))}
                        </div>

                        <label className={`hover:scale-102 transition flex justify-center items-center gap-2 border border-blue-700 rounded-xl bg-blue-50 h-15 px-4 mb-5 ${quantity === Number(customQuantity) ? "bg-green-50 border-green-700" : "bg-blue-50 border-blue-700"}`}>
                            <input
                                type="radio"
                                className="checked:accent-green-700 transition"
                                checked={quantity === Number(customQuantity)}
                                onChange={() => setQuantity(Number(customQuantity) || 1)}
                            />
                            <Input
                                placeholder="Свое число"
                                value={customQuantity}
                                onChange={(e) => {
                                    const val = e.target.value.replace(/\D/g, ''); // Только цифры
                                    setCustomQuantity(val);
                                    setQuantity(Number(val) || 1);
                                }}
                            />
                        </label>

                        <button
                            onClick={handleAddCart}
                            className="w-full py-4 px-6 text-base font-bold rounded-xl shadow-md bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            Добавить в корзину за {quantity * (product?.price || 0)} {renderCurrency(product?.currency)}
                        </button>
                    </motion.div>
                ) : (
                    <button
                        disabled
                        className="hover:scale-105 transition w-full py-4 px-6 text-base font-bold rounded-xl shadow-md bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-100 disabled:opacity-75 disabled:text-gray-700"
                    >
                        Товара нет в наличии
                    </button>
                )
            )}
        </AnimatePresence>
    );
}

interface InCartAdderProps {
    item: ICartItem;
}

export function InCartAdder({ item }: InCartAdderProps) {
    const { dispatch } = useApp();

    if (!item) {
        return <div className="text-xs text-rose-500 font-medium">Ошибка данных</div>;
    }

    const product = item.product || {};
    const productId = product.id;
    const quantity = item.quantity || 0;

    const handleQuantityChange = (type: "−" | "+") => {
        if (!productId) return;
        dispatch({
            type: 'UPDATE_QUANTITY',
            payload: { productId, type }
        });
    };

    const handleRemoveItem = () => {
        if (!productId) return;
        dispatch({
            type: 'REMOVE_ITEM',
            payload: { productId }
        });
    };

    return (
        <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-0 pt-3 sm:pt-0">
            <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden">
                <button
                    onClick={() => handleQuantityChange("−")}
                    className="px-3 py-1.5 text-slate-500 hover:bg-slate-200 active:bg-slate-300 font-semibold transition-colors"
                >
                    −
                </button>
                <span className="px-3 py-1.5 text-sm font-bold text-slate-800 select-none min-w-[2.5rem] text-center">
                    {quantity}
                </span>
                <button
                    onClick={() => handleQuantityChange("+")}
                    className="px-3 py-1.5 text-slate-500 hover:bg-slate-200 active:bg-slate-300 font-semibold transition-colors"
                >
                    +
                </button>
            </div>
            <button
                onClick={handleRemoveItem}
                className="hover:text-red-500 transition-colors"
            >
                <Trash2 size={18} />
            </button>
        </div>
    );
}
