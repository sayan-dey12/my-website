"use client";

import { IconCloud } from "./icon-cloud";
import { useTheme } from "next-themes";
import { FaReact, FaNodeJs, FaDocker, FaGithub, FaJava, FaPython, FaTerminal } from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiPostgresql,
  SiMongodb,
  SiKubernetes,
  SiAmazon,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiGit,
  SiExpress,
  SiRedis,
  SiNginx,
  SiTerraform,
  SiPrometheus,
  SiGrafana,
  SiJenkins,
  SiLinux,
  SiGo,
  SiVercel,
  SiApachekafka,
} from "react-icons/si";

export function IconCloudDemo() {
  const { theme } = useTheme();

  const techIcons = [
    { icon: <FaReact color="#61DAFB" />, name: "React" },
    { icon: <SiNextdotjs color={theme === "dark" ? "#ffffff" : "#000000"} />, name: "Next.js" },
    { icon: <SiTypescript color="#3178C6" />, name: "TypeScript" },
    { icon: <FaNodeJs color="#339933" />, name: "Node.js" },
    { icon: <SiExpress color={theme === "dark" ? "#ffffff" : "#000000"} />, name: "Express.js" },
    { icon: <FaJava color="#007396" />, name: "Java" },
    { icon: <FaPython color="#3776AB" />, name: "Python" },
    { icon: <SiGo color="#00ADD8" />, name: "Golang" },
    { icon: <SiPostgresql color="#336791" />, name: "PostgreSQL" },
    { icon: <SiMongodb color="#47A248" />, name: "MongoDB" },
    { icon: <SiRedis color="#DC382D" />, name: "Redis" },
    { icon: <FaDocker color="#0db7ed" />, name: "Docker" },
    { icon: <SiKubernetes color="#326CE5" />, name: "Kubernetes" },
    { icon: <SiAmazon color="#FF9900" />, name: "AWS" },
    { icon: <SiVercel color={theme === "dark" ? "#ffffff" : "#000000"} />, name: "Vercel" },
    { icon: <FaGithub color={theme === "dark" ? "#ffffff" : "#181717"} />, name: "GitHub" },
    { icon: <SiGit color="#F34F29" />, name: "Git" },
    { icon: <SiHtml5 color="#E34F26" />, name: "HTML5" },
    { icon: <SiCss3 color="#1572B6" />, name: "CSS3" },
    { icon: <SiJavascript color="#F7DF1E" />, name: "JavaScript" },
    { icon: <FaTerminal color={theme === "dark" ? "#ffffff" : "#333333"} />, name: "CLI / DevOps" },
    { icon: <SiNginx color="#009639" />, name: "Nginx" },
    { icon: <SiTerraform color="#623CE4" />, name: "Terraform" },
    { icon: <SiPrometheus color="#E6522C" />, name: "Prometheus" },
    { icon: <SiGrafana color="#F46800" />, name: "Grafana" },
    { icon: <SiJenkins color="#D24939" />, name: "Jenkins" },
    { icon: <SiLinux color={theme === "dark" ? "#ffffff" : "#000000"} />, name: "Linux" },
    { icon: <SiApachekafka color={theme === "dark" ? "#ffffff" : "#231F20"} />, name: "Kafka" },
  ];

  return (
    <div className="relative flex w-full h-[350px] items-center justify-center overflow-hidden">
      <IconCloud icons={techIcons.map((i) => i.icon)} />
    </div>
  );
}
