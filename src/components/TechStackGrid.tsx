"use client";

import { FaReact, FaNodeJs, FaGithub, FaDocker, FaPython, FaJava } from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiMongodb, SiPostgresql, SiKubernetes, SiAmazon } from "react-icons/si";
import { motion } from "framer-motion";

const skills = [
  { icon: <FaReact />, name: "React" },
  { icon: <SiNextdotjs />, name: "Next.js" },
  { icon: <SiTypescript />, name: "TypeScript" },
  { icon: <FaNodeJs />, name: "Node.js" },
  { icon: <FaJava />, name: "Java" },
  { icon: <FaPython />, name: "Python" },
  { icon: <SiPostgresql />, name: "PostgreSQL" },
  { icon: <SiMongodb />, name: "MongoDB" },
  { icon: <FaDocker />, name: "Docker" },
  { icon: <SiKubernetes />, name: "Kubernetes" },
  { icon: <SiAmazon />, name: "AWS" },
  { icon: <FaGithub />, name: "GitHub" },
];

export default function TechStackGrid() {
  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        Tech Stack
      </h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-8 max-w-5xl mx-auto">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center text-center cursor-pointer"
            whileHover={{ scale: 1.15, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="text-5xl text-blue-500 mb-2">{skill.icon}</div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {skill.name}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
