import { Dispatch, SetStateAction } from 'react';
import {ICartItem, IProduct} from "@/types/product.types";

type DeliveryMethod = {
    method: string,
    address: string,
    pvz: string,
}
type PaymentMethod = "sbp" | "bank" | "invoice";

type FormData = {
    name: string;
    phone: string;
    email: string;
};

type InvoiceData = {
    inn: string;
    company: string;
    kpp: string,
    email: string
};

export type CartAction =
    | {
    type: 'ADD_ITEM';
    payload: { product: IProduct; quantity: number };
}
    | {
    type: 'UPDATE_QUANTITY';
    payload: { productId: IProduct['id']; type: '+' | '−' };
}
    | {
    type: 'REMOVE_ITEM';
    payload: { productId: IProduct['id'] };
}
    | {
    type: 'INIT_CART';
    payload: ICartItem[];
};

export interface AppContextType {
    selectedCategories: string[];
    setSelectedCategories: Dispatch<SetStateAction<string[]>>;

    searchQuery: string;
    setSearchQuery: Dispatch<SetStateAction<string>>;

    cartItems: ICartItem[];
    dispatch: Dispatch<CartAction>; // тип из вашего cartReducer

    deliveryMethod: DeliveryMethod;
    setDeliveryMethod: Dispatch<SetStateAction<DeliveryMethod>>;

    formData: FormData;
    setFormData: Dispatch<SetStateAction<FormData>>;

    invoiceData: InvoiceData;
    setInvoiceData: Dispatch<SetStateAction<InvoiceData>>;

    paymentMethod: PaymentMethod;
    setPaymentMethod: Dispatch<SetStateAction<PaymentMethod>>;
}