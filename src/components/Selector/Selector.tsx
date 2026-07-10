'use client'; // Обязательно для использования useRouter и интерактивности Ant Design
import React, { useMemo } from 'react';
import { Select } from 'antd';
import { useRouter } from 'next/navigation'; // Импортируем роутер Next.js
import "./Selector.css";
import PRODUCTS from "../../data/products.json";
import {useApp} from "../../context/AppContext";

const Selector = () => {
    const router = useRouter(); // Инициализируем роутер вместо useNavigate
    const { selectedCategories, setSelectedCategories } = useApp();
    // Оптимизируем получение уникальных категорий
    const allCategories = useMemo(() => [...new Set(PRODUCTS.map(p => p.category))], []);

    // Формируем список опций для Ant Design
    const optionsName = useMemo(() => {
        return allCategories.map(option => ({
            value: option,
            label: option,
            otherField: ''
        }));
    }, [allCategories]);

    const handleSelected = (value:any) => {
        setSelectedCategories([value]); // Обновляем выбранную категорию
        router.push('/catalog'); // Перенаправляем на страницу каталога
    };

    return (
        <Select
            value={selectedCategories}
            onChange={handleSelected}
            className="select"
            placeholder="Каталог"
            showSearch={{
                optionFilterProp: ['label', 'otherField'],
            }}
            options={optionsName}
        />
    );
};

export default Selector;
