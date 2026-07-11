'use client';
import { createContext, useContext, useState, useEffect, useReducer } from 'react';
import { TCartItems } from "@/types/product.types";
import { CartAction, AppContextType } from "@/types/context.types";
import ChildrenProps from "@/types/children.types";

// 👇 ДОБАВЛЕНЫ ИМПОРТЫ FIREBASE
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase"; // 👈 Проверьте относительный путь к вашему файлу firebase.ts!

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
                { id: Date.now().toString(), product, quantity }
            ];
        }

        case 'UPDATE_QUANTITY': {
            const { productId, type } = action.payload;
            const targetItem = cartItems.find(item => item.product.id === productId);

            if (!targetItem) return cartItems;

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

    // 👇 1. ХРАНИЛИЩЕ ДЛЯ ID АВТОРИЗОВАННОГО ПОЛЬЗОВАТЕЛЯ
    const [userId, setUserId] = useState<string | null>(null);

    // 👇 2. СЛЕДИМ ЗА СОСТОЯНИЕМ АВТОРИЗАЦИИ
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserId(user.uid);
            } else {
                setUserId(null);
                dispatch({ type: 'INIT_CART', payload: [] }); // Очищаем стейт при выходе
            }
        });
        return () => unsubscribe();
    }, []);

    // 👇 3. МОДЕРНИЗИРОВАННАЯ ЗАГРУЗКА КОРЗИНЫ (ПРИОРИТЕТ У СЕРВЕРА)
    useEffect(() => {
        async function loadCart() {
            if (userId) {
                // Если пользователь вошел — запрашиваем его облачную корзину
                try {
                    const userDoc = await getDoc(doc(db, "users", userId));
                    if (userDoc.exists() && userDoc.data().cart) {
                        dispatch({ type: 'INIT_CART', payload: userDoc.data().cart });
                        return; // Успешно загрузили с сервера, выходим из функции
                    }
                } catch (e) {
                    console.error("Ошибка загрузки корзины из Firestore", e);
                }
            }

            // Если гость (или на сервере пусто) — восстанавливаем локальную корзину
            if (typeof window !== 'undefined') {
                const savedCart = localStorage.getItem('cart');
                if (savedCart) {
                    try {
                        dispatch({ type: 'INIT_CART', payload: JSON.parse(savedCart) });
                    } catch (e) {
                        console.error("Ошибка парсинга локальной корзины", e);
                    }
                }
            }
        }

        loadCart();
    }, [userId]);

    // 👇 4. МОДЕРНИЗИРОВАННОЕ СОХРАНЕНИЕ КОРЗИНЫ С ЗАЩИТОЙ ОТ СПАМА ЗАПРОСАМИ (DEBOUNCE)
    useEffect(() => {
        if (typeof window === 'undefined') return;

        // В любом случае дублируем изменения в localStorage для непрерывности сессии
        localStorage.setItem('cart', JSON.stringify(cartItems));

        // Если пользователь залогинен — отправляем массив в его документ Firestore
        if (userId) {
            const saveCartToServer = async () => {
                try {
                    await setDoc(doc(db, "users", userId), {
                        cart: cartItems
                    }, { merge: true }); // { merge: true } критически важен, чтобы не стереть имя/роль юзера!
                } catch (e) {
                    console.error("Ошибка синхронизации корзины с сервером", e);
                }
            };

            // Задержка в 500мс, чтобы не дергать базу данных на каждый клик "+" или "−"
            const timer = setTimeout(saveCartToServer, 500);
            return () => clearTimeout(timer);
        }
    }, [cartItems, userId]);

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
