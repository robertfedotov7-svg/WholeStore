'use client';
import { motion } from 'framer-motion';
import {ReactNode} from "react";
import ChildrenProps from "@/types/children.types";

export default function Template({ children }: ChildrenProps) {
    return (
        <motion.div
            style={{ position: "relative", width: "100%" }}
            initial={{ opacity: 0, y: "20px" }} // Лучше использовать небольшие сдвиги, 90% может дергать верстку при SSR
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-20px" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
        >
            {children}
        </motion.div>
    );
}
