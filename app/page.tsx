"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowDown, Code, ExternalLink, Github, Mail, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const observerRefs = useRef<IntersectionObserver[]>([])
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({
    home: null,
    about: null,
    skills: null,
    projects: null,
    contact: null,
  })

  useEffect(() => {
    // Clean up previous observers
    observerRefs.current.forEach((observer) => observer.disconnect())
    observerRefs.current = []

    // Create new observers for each section
    Object.entries(sectionRefs.current).forEach(([id, element]) => {
      if (!element) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id)
              element.classList.add("animate-in")
            }
          })
        },
        { threshold: 0.5 },
      )

      observer.observe(element)
      observerRefs.current.push(observer)
    })

    return () => {
      observerRefs.current.forEach((observer) => observer.disconnect())
    }
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-100">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            Portfolio
          </div>
          <ul className="hidden md:flex space-x-8">
            {Object.keys(sectionRefs.current).map((section) => (
              <li key={section}>
                <a
                  href={`#${section}`}
                  className={`capitalize transition-colors duration-300 ${
                    activeSection === section
                      ? "text-purple-600 dark:text-purple-400 font-medium"
                      : "text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                  }`}
                >
                  {section}
                </a>
              </li>
            ))}
          </ul>
          <button className="md:hidden">
            <User className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        ref={(el) => (sectionRefs.current.home = el)}
        className="min-h-screen flex items-center justify-center pt-16 opacity-0 transition-all duration-1000 transform translate-y-10"
      >
        <div className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
              Hello, I'm{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                John Doe
              </span>
            </h1>
            <h2 className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 mb-6">Full Stack Developer</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-lg">
              I create beautiful, functional, and responsive web applications with modern technologies.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#contact"
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-300 flex items-center"
              >
                Contact Me
                <Mail className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="#projects"
                className="px-6 py-3 border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white rounded-lg transition-colors duration-300"
              >
                View Work
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-purple-600 shadow-xl transform hover:scale-105 transition-transform duration-300">
              <Image src="/placeholder.svg?height=320&width=320" alt="Profile" fill className="object-cover" priority />
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <Link href="#about" className="text-purple-600 dark:text-purple-400">
            <ArrowDown className="h-8 w-8" />
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        ref={(el) => (sectionRefs.current.about = el)}
        className="min-h-screen flex items-center justify-center py-20 opacity-0 transition-all duration-1000 transform translate-y-10"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
            About <span className="text-purple-600">Me</span>
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2">
              <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-xl">
                <Image src="/placeholder.svg?height=384&width=576" alt="About Me" fill className="object-cover" />
              </div>
            </div>
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold mb-4 text-purple-600">My Journey</h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                I'm a passionate full-stack developer with over 5 years of experience building web applications. I
                specialize in React, Next.js, Node.js, and modern web technologies.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                My journey began when I discovered my passion for creating digital experiences that are both beautiful
                and functional. Since then, I've worked with startups and established companies to bring their visions
                to life.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h4 className="font-bold">Name:</h4>
                  <p className="text-gray-600 dark:text-gray-300">John Doe</p>
                </div>
                <div>
                  <h4 className="font-bold">Email:</h4>
                  <p className="text-gray-600 dark:text-gray-300">john@example.com</p>
                </div>
                <div>
                  <h4 className="font-bold">From:</h4>
                  <p className="text-gray-600 dark:text-gray-300">San Francisco, CA</p>
                </div>
                <div>
                  <h4 className="font-bold">Freelance:</h4>
                  <p className="text-purple-600">Available</p>
                </div>
              </div>
              <Link
                href="#contact"
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-300 inline-block"
              >
                Download CV
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        ref={(el) => (sectionRefs.current.skills = el)}
        className="min-h-screen flex items-center justify-center py-20 bg-gray-100 dark:bg-gray-800 opacity-0 transition-all duration-1000 transform translate-y-10"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
            My <span className="text-purple-600">Skills</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Frontend Development",
                skills: ["React", "Next.js", "Tailwind CSS", "TypeScript"],
                icon: Code,
              },
              {
                title: "Backend Development",
                skills: ["Node.js", "Express", "MongoDB", "PostgreSQL"],
                icon: Github,
              },
              {
                title: "UI/UX Design",
                skills: ["Figma", "Adobe XD", "Responsive Design"],
                icon: ExternalLink,
              },
              {
                title: "DevOps",
                skills: ["Docker", "AWS", "CI/CD", "Vercel"],
                icon: Code,
              },
              {
                title: "Mobile Development",
                skills: ["React Native", "Flutter", "iOS", "Android"],
                icon: Github,
              },
              {
                title: "Other Skills",
                skills: ["SEO", "Performance Optimization", "Accessibility"],
                icon: ExternalLink,
              },
            ].map((skillGroup, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 transform hover:scale-105 transition-transform duration-300"
              >
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-6">
                  <skillGroup.icon className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-4">{skillGroup.title}</h3>
                <ul className="space-y-2">
                  {skillGroup.skills.map((skill, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className="w-2 h-2 bg-purple-600 rounded-full mr-2"></span>
                      <span className="text-gray-600 dark:text-gray-300">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        ref={(el) => (sectionRefs.current.projects = el)}
        className="min-h-screen flex items-center justify-center py-20 opacity-0 transition-all duration-1000 transform translate-y-10"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
            My <span className="text-purple-600">Projects</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "E-commerce Platform",
                description: "A full-featured online store with payment integration and admin dashboard.",
                image: "/placeholder.svg?height=300&width=400",
                tags: ["React", "Node.js", "MongoDB"],
              },
              {
                title: "Social Media App",
                description: "A social platform with real-time messaging and content sharing.",
                image: "/placeholder.svg?height=300&width=400",
                tags: ["Next.js", "Socket.io", "PostgreSQL"],
              },
              {
                title: "Portfolio Website",
                description: "A responsive portfolio website with animations and dark mode.",
                image: "/placeholder.svg?height=300&width=400",
                tags: ["React", "Tailwind CSS", "Framer Motion"],
              },
              {
                title: "Task Management",
                description: "A productivity app for managing tasks and collaborating with teams.",
                image: "/placeholder.svg?height=300&width=400",
                tags: ["Vue.js", "Express", "MongoDB"],
              },
              {
                title: "Weather App",
                description: "A weather forecast application with location detection.",
                image: "/placeholder.svg?height=300&width=400",
                tags: ["React", "OpenWeather API", "Geolocation"],
              },
              {
                title: "Fitness Tracker",
                description: "An app to track workouts, nutrition, and fitness progress.",
                image: "/placeholder.svg?height=300&width=400",
                tags: ["React Native", "Firebase", "Charts"],
              },
            ].map((project, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg group">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-purple-600 bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex space-x-3">
                      <a
                        href="#"
                        className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-purple-600 hover:bg-purple-100 transition-colors duration-300"
                      >
                        <Github className="h-5 w-5" />
                      </a>
                      <a
                        href="#"
                        className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-purple-600 hover:bg-purple-100 transition-colors duration-300"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        ref={(el) => (sectionRefs.current.contact = el)}
        className="min-h-screen flex items-center justify-center py-20 bg-gray-100 dark:bg-gray-800 opacity-0 transition-all duration-1000 transform translate-y-10"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
            Contact <span className="text-purple-600">Me</span>
          </h2>
          <div className="flex flex-col md:flex-row gap-10">
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Feel free to reach out if you're looking for a developer, have a question, or just want to connect.
              </p>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-4">
                    <Mail className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-bold">Email</h4>
                    <p className="text-gray-600 dark:text-gray-300">john@example.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-4">
                    <Github className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-bold">GitHub</h4>
                    <p className="text-gray-600 dark:text-gray-300">github.com/johndoe</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-4">
                    <Code className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-bold">LinkedIn</h4>
                    <p className="text-gray-600 dark:text-gray-300">linkedin.com/in/johndoe</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <form className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 dark:bg-gray-800"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 dark:bg-gray-800"
                      placeholder="Your Email"
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 dark:bg-gray-800"
                    placeholder="Subject"
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 dark:bg-gray-800"
                    placeholder="Your Message"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            © {new Date().getFullYear()} John Doe. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}
