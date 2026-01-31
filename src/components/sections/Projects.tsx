"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ProjectCard from "./ProjectCard";

const projects = [
    {
        title: "SolviqAI Assessment Platform",
        description:
            "Full-stack AI hiring platform with automated interview rounds, coding evaluation, and LLM-powered feedback. Serves 500+ active users with real-time assessment capabilities.",
        tech: ["Next.js", "FastAPI", "PostgreSQL", "LangChain"],
        github: null,
        demo: "#",
        image: null,
        featured: true,
    },
    {
        title: "Odia Alpha-Numeric Character Recognition",
        description:
            "Built an end-to-end image classification app to recognize Odia alphanumeric characters. Integrated pre-trained CNN models (ResNet, EfficientNet) and deployed using Flask.",
        tech: ["Python", "Flask", "TensorFlow", "CNN"],
        github: "#",
        demo: null,
        image: null,
        featured: true,
    },
    {
        title: "Stock Price Prediction",
        description:
            "Developed a time-series forecasting model using LSTM and integrated it into a Flask dashboard. Designed data pipelines, preprocessing scripts, and automated visualization modules.",
        tech: ["Python", "TensorFlow", "Keras", "Flask", "Pandas"],
        github: "#",
        demo: null,
        image: null,
    },
    {
        title: "PDF Data Extraction Tool",
        description:
            "Engineered a Python tool to extract, parse, and convert PDF content into structured JSON/Excel files using OCR and NLP for document understanding.",
        tech: ["Python", "PyMuPDF", "PaddleOCR", "Pandas"],
        github: "#",
        demo: null,
        image: null,
    },
];

const headingVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
};

export default function Projects() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="projects" className="py-24">
            <motion.h2
                ref={ref}
                variants={headingVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="text-5xl md:text-8xl font-serif text-white tracking-tight mb-16"
            >
                Projects
            </motion.h2>

            <div className="grid gap-8 md:grid-cols-2">
                {projects.map((project, index) => (
                    <ProjectCard key={index} project={project} index={index} />
                ))}
            </div>
        </section>
    );
}
