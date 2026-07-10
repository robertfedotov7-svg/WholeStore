"use client"
import { Input } from "antd";
import {useRouter} from "next/navigation";
import useInput from "../../hooks/useInput";
import {useApp} from "../../context/AppContext";

const Inputt = () => {
    const router = useRouter(); // Получаем объект роутера
    const input = useInput();
    const {
        searchQuery,
        setSearchQuery,
    } = useApp();
    const handleKeyDown = (e) => {
        if (e.target.value.trim() !== "") {
            if (e.key === "Enter") {
                router.push('/catalog');
            }
        }
    }
    return (
        <Input
            {...input}
            value={searchQuery}
            className="h-10"
            onKeyDown={handleKeyDown}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Название товара..."
        />
    )
}

export default Inputt;