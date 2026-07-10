import { AppProvider } from '../context/AppContext';
import Layout from '../components/Layouts/Layout';
import "./styles/App.css";
import { Metadata } from 'next';
import ChildrenProps from "@/types/children.types";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
    title: 'Оптовый интернет-магазин',
    description: 'Продажа товаров оптом от производителя',
};



export default function RootLayout({ children }: ChildrenProps) {
    return (
        <html lang="ru">
        <body>
        <AuthProvider>
            <AppProvider>
                <Layout>
                    {children}
                </Layout>
            </AppProvider>
        </AuthProvider>
        </body>
        </html>
    );
}
