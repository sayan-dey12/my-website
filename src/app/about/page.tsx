import Link from "next/link";
import { FaGithub, FaXTwitter, FaInstagram, FaLinkedin } from "react-icons/fa6";

export const metadata = {
  title: "About | Sayan Dey (Strider)",
  description:
    "Know more about Sayan Dey aka Strider — a passionate full-stack developer, AI learner, and builder of TechWithStrider, on a mission to create impactful, intelligent, and scalable digital products.",
};

export default function AboutPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-24 space-y-28">
      {/* Hero */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 bg-clip-text text-transparent leading-tight">
          Hey, I’m Sayan Dey 👋
        </h1>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Also known as <strong>Strider</strong> — a developer, learner, and creator passionate about
          exploring how technology and intelligence can work together to build the future.
        </p>
      </section>

      {/* Identity */}
      <section className="space-y-8 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold">Who Am I?</h2>
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
          I’m a student developer and a lifelong learner who loves turning complex ideas into elegant
          systems. My focus lies at the intersection of <strong>full-stack development, AI, and DevOps</strong> —
          the core technologies that power today’s most advanced products.
          <br />
          <br />
          I’m fascinated by how things work behind the scenes — from the low-level logic that makes
          code efficient to the architecture that makes apps scalable. My long-term goal is to grow
          into a <strong>technically strong founder</strong> — capable of designing, developing, and deploying
          complete products from scratch with precision and creativity.
        </p>
      </section>

      {/* Vision */}
      <section className="space-y-8 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold">My Vision</h2>
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
          My goal is to blend <strong>technology, creativity, and systems thinking</strong> to create tools
          and experiences that simplify people’s lives. I believe in the power of small, consistent
          progress — every project, every experiment, and every bug fixed is a step toward mastery.
          <br />
          <br />
          Through <span className="font-medium">TechWithStrider</span>, I document my journey — learning modern
          engineering, experimenting with AI, and exploring DevOps and scalability — not just to
          build skills, but to build things that matter.
        </p>
      </section>

      {/* Tech Stack */}
      <section className="text-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-10">My Tech Stack</h2>
        <ul className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
          {[
            "TypeScript / JavaScript",
            "React / Next.js",
            "Node.js / Express / REST / GraphQL",
            "MongoDB / PostgreSQL / Redis",
            "Docker / Linux / GitHub Actions / CI-CD",
            "LangChain / OpenAI / Python / Machine Learning / AI",
            "Golang (Learning) / DevOps / Cloud Infrastructure",
          ].map((tech) => (
            <li
              key={tech}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md hover:shadow-lg transition-shadow"
            >
              {tech}
            </li>
          ))}
        </ul>
      </section>

      {/* Connect */}
      <section className="text-center space-y-6">
        <h2 className="text-2xl md:text-3xl font-semibold">Let’s Connect</h2>
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          I love connecting with fellow developers, creators, and curious learners. If you’re building
          something exciting or just want to talk tech, feel free to reach out.
        </p>
        <div className="flex justify-center gap-10 text-2xl md:text-3xl mt-4">
          <Link
            href="https://github.com/sayan-dey12"
            target="_blank"
            className="hover:text-black dark:hover:text-white transition"
          >
            <FaGithub />
          </Link>
          <Link
            href="https://x.com/sayan_dey12"
            target="_blank"
            className="hover:text-blue-500 transition"
          >
            <FaXTwitter />
          </Link>
          <Link
            href="https://www.instagram.com/sayan_.dey_"
            target="_blank"
            className="hover:text-pink-500 transition"
          >
            <FaInstagram />
          </Link>
          <Link
            href="https://www.linkedin.com/in/sayan-dey-b37843378/"
            target="_blank"
            className="hover:text-blue-600 transition"
          >
            <FaLinkedin />
          </Link>
        </div>
      </section>
    </main>
  );
}
