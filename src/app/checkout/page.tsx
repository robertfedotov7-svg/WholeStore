import React from 'react';
import Link from "next/link";
import FormSend from "@/components/FormSend/FormSend";
import Check from '@/components/Checkout/Check';
import Footer from '@/components/Footer/Footer';

export default function CheckoutPage() {
    return (
        <>
            <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 mt-10">
                {/* Хлебные крошки */}
                <nav className="text-sm text-slate-500 mb-6 flex items-center gap-2">
                    <Link href="/catalog" className="hover:text-slate-800 transition-colors">Каталог</Link>
                    <span>/</span>
                    <Link href="/cart" className="hover:text-slate-800 transition-colors">Корзина</Link>
                    <span>/</span>
                    <span className="text-slate-800 font-medium">Оформление и оплата</span>
                </nav>

                <h1 className="text-3xl font-bold text-slate-900 mb-8">Оформление заказа</h1>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    <FormSend />
                    <Check />
                </div>
            </div>
            <Footer />
        </>
    );
}
