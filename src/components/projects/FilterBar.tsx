"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface FilterBarProps {
    categories: string[];
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
}

const FilterBar = ({ categories, selectedCategory, onSelectCategory }: FilterBarProps) => {
    return (
        <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => onSelectCategory(category)}
                    className={`relative px-5 py-2.5 rounded-none text-xs font-bold uppercase tracking-widest transition-all border ${
                        selectedCategory === category
                            ? 'text-concept-white border-concept-blue'
                            : 'text-concept-blue/60 border-concept-blue/10 hover:border-concept-blue hover:text-concept-blue bg-concept-gray'
                    }`}
                >
                    {selectedCategory === category && (
                        <motion.div
                            layoutId="activeFilter"
                            className="absolute inset-0 bg-concept-blue"
                            transition={{ type: "spring", bounce: 0.1, duration: 0.4 }}
                        />
                    )}
                    <span className="relative z-10">{category}</span>
                </button>
            ))}
        </div>
    );
};

export default FilterBar;
