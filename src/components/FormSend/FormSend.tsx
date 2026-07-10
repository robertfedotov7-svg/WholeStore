"use client"
import Contacts from "../Checkout/Contacts";
import Delivery from "../Checkout/Delivery";
import PayBox from "../Checkout/PayBox";
import React from "react";
import {useApp} from "../../context/AppContext";
import { useAuth } from "@/context/AuthContext";

const FormSend = () => {
    const { cartItems, deliveryMethod, formData, paymentMethod, invoiceData } = useApp();
    const { user } = useAuth();
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.name.trim() || !formData.phone.trim()) {
            alert("Заполни контактные данные");
            return;
        }

        // ИСПРАВЛЕНО: Сравниваем со значением ключа .method и проверяем правильный стейт
        if (deliveryMethod.method === "courier" && !deliveryMethod.address.trim()) {
            alert("Введите адрес доставки");
            return;
        }

        // ИСПРАВЛЕНО: Сравниваем со значением ключа .method и проверяем правильный стейт
        if (deliveryMethod.method === "pvz" && !deliveryMethod.pvz.trim()) {
            alert("Введите пункт выдачи (ПВЗ)");
            return;
        }

        if (paymentMethod === "invoice") {
            if (!invoiceData.inn.trim() || !invoiceData.company.trim()) {
                alert("Заполни данные компании");
                return;
            }
        }

        console.log("ORDER SUCCESS:", {
            user,
            formData,
            invoiceData: paymentMethod === "invoice" ? invoiceData : null,
            deliveryMethod,
            paymentMethod,
            cartItems,
        });
    };
    return (
        <form id="checkout-form" onSubmit={handleSubmit} className="lg:col-span-7 space-y-8">
            {/* БЛОК 1: Контактные данные */}
            <Contacts />

            {/* БЛОК 2: Способ доставки */}
            <Delivery />

            {/* БЛОК 3: Способ оплаты */}
            <PayBox />
        </form>

    )
}
export default FormSend;