'use client';
import {createContext, useContext, useState, useEffect, useReducer} from 'react';
import {TCartItems} from "@/types/product.types";
import {CartAction, AppContextType} from "@/types/context.types";
import ChildrenProps from "@/types/children.types";


const AppContext = createContext<AppContextType | null>(null);

function cartReducer(cartItems: TCartItems, action: CartAction): TCartItems {
    switch (action.type) {
        case 'ADD_ITEM': {
            const { product, quantity } = action.payload;
            const isItemExist = cartItems.find((item) => item.product.id === product.id);

            if (isItemExist) {
                // @ts-ignore
                return cartItems.map(item =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }

            // @ts-ignore
            return [
                ...cartItems,
                { id: Date.now().toString(), product, quantity } // 👈 ИСПРАВЛЕНО: теперь id это string
            ];
        }

        case 'UPDATE_QUANTITY': {
            const { productId, type } = action.payload;
            const targetItem = cartItems.find(item => item.product.id === productId);

            if (!targetItem) return cartItems;

            // Используйте строго тот же символ минуса, что указан в типе CartAction
            if (type === '−' && targetItem.quantity === 1) {
                // @ts-ignore
                return cartItems.filter(item => item.product.id !== productId);
            }
            // @ts-ignore
            return cartItems.map(item =>
                item.product.id === productId
                    ? { ...item, quantity: item.quantity + (type === '+' ? 1 : -1) }
                    : item
            );
        }

        case 'REMOVE_ITEM': {
            const { productId } = action.payload;
            // @ts-ignore
            return cartItems.filter(item => item.product.id !== productId);
        }

        case 'INIT_CART':
            // @ts-ignore
            return action.payload;

        default:
            return cartItems;
    }
}




export function AppProvider({ children }: ChildrenProps) {

    const [selectedCategories, setSelectedCategories] = useState<AppContextType["selectedCategories"]>([]);
    const [searchQuery, setSearchQuery] = useState<AppContextType["searchQuery"]>(""); // @ts-ignore
    const [cartItems, dispatch] = useReducer(cartReducer, []);
    const [formData, setFormData] = useState<AppContextType['formData']>({
        name: "",
        phone: "",
        email: "",
    });
    const [deliveryMethod, setDeliveryMethod] = useState<AppContextType['deliveryMethod']>({
        method: "courier",
        address: "",
        pvz: "",
    });
    const [paymentMethod, setPaymentMethod] = useState<AppContextType['paymentMethod']>("sbp");
    const [invoiceData, setInvoiceData] = useState<AppContextType['invoiceData']>({
        inn: "",
        company: "",
        kpp: "",
        email: ""
    });
    // 2. MEMOIZED CALCULATIONS (Безопасный подсчет с защитой от undefined)


    // Загрузка корзины из localStorage только на клиенте
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            try {
                dispatch({
                    type: 'INIT_CART',
                    payload: JSON.parse(savedCart)
                });
            } catch (e) {
                console.error("Ошибка парсинга корзины", e);
            }
        }
    }, []);

    // Сохранение корзины
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('cart', JSON.stringify(cartItems));
        }
    }, [cartItems]);

    return (
        <AppContext.Provider value={{
            selectedCategories, setSelectedCategories,
            searchQuery, setSearchQuery,
            cartItems, dispatch,
            deliveryMethod, setDeliveryMethod,
            formData, setFormData,
            invoiceData, setInvoiceData,
            paymentMethod, setPaymentMethod,
        }}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp должен использоваться строго внутри AppProvider');
    }
    return context;
}