export interface ISpecs {
    [key: string]: string;
}

export interface IProduct {
    id: number;
    title: string;
    sku: string;
    price: number;
    oldPrice: number;
    currency: "₽" | "$" | "€";
    isPopular: boolean;
    isAvailable: boolean;
    category: string
    images: string[];
    description: string;
    specs: ISpecs
}

export interface ICartItem {
    id: string;
    product: IProduct;
    quantity: number;
}

export type TCartItems = ICartItem[];