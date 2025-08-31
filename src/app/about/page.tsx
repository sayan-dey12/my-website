import Link from "next/link";
import { FaGithub, FaXTwitter, FaInstagram, FaLinkedin } from "react-icons/fa6";

export const metadata = {
  title: "About | Sayan Dey (Strider)",
  description: "Learn more about Sayan Dey aka Strider — a passionate student, developer, and creator of TechWithStrider.",
};

export default function AboutPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-16 space-y-16">
      {/* Hero */}
      <section className="text-center">
        <h1 className="text-4xl font-extrabold mb-4">About Me</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          Hi, I’m <strong>Sayan Dey</strong> (aka <strong>Strider</strong>). A curious student and developer
          passionate about <span className="font-medium">full-stack development</span>, 
          <span className="font-medium"> AI</span>, and <span className="font-medium">open source</span>.
        </p>
      </section>

      {/* Story */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-center">My Journey</h2>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-center max-w-3xl mx-auto">
          I started coding as a hobby and turned it into a journey of building products, contributing
          to open-source, and writing blogs to share what I learn. <br />
          <br />
          <span className="font-medium">TechWithStrider</span> is my personal learning lab — a space to
          explore, experiment, and grow.
        </p>
      </section>

      {/* Tech Stack */}
      <section>
        <h2 className="text-2xl font-semibold text-center mb-6">My Tech Stack</h2>
        <ul className="flex flex-wrap justify-center gap-3 text-sm">
          {[
            "JavaScript / TypeScript",
            "React / Next.js",
            "Node.js / Express",
            "MongoDB / Redis",
            "Docker / GitHub Actions",
            "LangChain / Python / AI",
          ].map((tech) => (
            <li key={tech} className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              {tech}
            </li>
          ))}
        </ul>
      </section>

      {/* Socials */}
      <section className="text-center">
        <h2 className="text-2xl font-semibold mb-6">Find Me Online</h2>
        <div className="flex justify-center gap-8 text-2xl">
          <Link href="https://github.com/sayan-dey12" target="_blank"><FaGithub className="hover:text-black dark:hover:text-white transition" /></Link>
          <Link href="https://x.com/sayan_dey12" target="_blank"><FaXTwitter className="hover:text-blue-600 transition" /></Link>
          <Link href="https://www.instagram.com/sayan_.dey_" target="_blank"><FaInstagram className="hover:text-pink-600 transition" /></Link>
          <Link href="https://www.linkedin.com/in/sayan-dey-b37843378/" target="_blank"><FaLinkedin className="hover:text-blue-700 transition" /></Link>
        </div>
      </section>
    </main>
  );
}
