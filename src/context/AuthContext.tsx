"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter, usePathname } from "next/navigation";

interface AuthContextType {
    user: User | null;
    role: "user" | "admin" | "manager";
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, role: null as any, loading: true });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [role, setRole] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);

            if (currentUser) {
                const idTokenResult = await currentUser.getIdTokenResult();
                const userRole = idTokenResult.claims.role as string || "user";
                setRole(userRole);

                // Проверяем статус анкеты в Firestore, только если почта уже подтверждена
                if (currentUser.emailVerified) {
                    const docRef = doc(db, "users", currentUser.uid);
                    const docSnap = await getDoc(docRef);

                    const hasCompletedOnboarding = docSnap.exists() && docSnap.data().onboardingCompleted === true;

                    // Если анкета не заполнена и пользователь НЕ на странице онбординга прямо сейчас
                    if (!hasCompletedOnboarding && pathname !== "/welcome") {
                        router.push("/welcome");
                    }
                }
            } else {
                setRole(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, [pathname, router]);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);

            if (currentUser) {
                // Берем роль прямо из токена, это не вызывает RPC-ошибок Firestore
                const idTokenResult = await currentUser.getIdTokenResult();
                const userRole = idTokenResult.claims.role as string || "user";
                setRole(userRole);
            } else {
                setRole(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);



    return (
        <AuthContext.Provider value={{ user, role: role as any, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
