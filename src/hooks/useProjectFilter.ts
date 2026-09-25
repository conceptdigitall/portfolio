import { useState, useMemo } from 'react';
import { projects } from '@/data/projects';
import { Project } from '@/types/project';

export const useProjectFilter = () => {
    const [selectedCategory, setSelectedCategory] = useState("Todos");

    const categories = ["Todos", "Concept Landing Pages", "Concept Systems (WaaS)"];

    const filteredProjects = useMemo(() => {
        if (selectedCategory === "Todos") return projects;
        return projects.filter((project: Project) => project.category === selectedCategory);
    }, [selectedCategory]);

    return {
        selectedCategory,
        setSelectedCategory,
        categories,
        filteredProjects
    };
};
