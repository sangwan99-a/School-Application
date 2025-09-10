import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, Users, Award, School, Library, FlaskConical, Trophy, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react";
import { motion } from "framer-motion";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Academics", href: "#academics" },
  { name: "Facilities", href: "#facilities" },
  { name: "Contact", href: "#contact" }
];

export default function PublicLanding() {
  const navigate = useNavigate();
  const handleStudentPortal = () => {
    navigate("/student-profile");
  };

  return (
    <div className="font-sans min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full bg-white shadow z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
          <div className="flex items-center gap-2">
            <School className="h-8 w-8 text-blue-700" />
            <span className="text-2xl font-bold text-blue-700 tracking-tight">Springfield Public School</span>
          </div>
          <nav className="hidden md:flex gap-7">
            {navLinks.map(link => (
              <a key={link.name} href={link.href} className="text-gray-700 font-medium hover:text-blue-700 transition text-lg px-2 py-1 rounded hover:bg-blue-50">{link.name}</a>
            ))}
          </nav>
          {/* Search bar */}
          <input
            type="text"
            placeholder="Search..."
            className="hidden md:block ml-7 px-3 py-1 border rounded bg-gray-100"
          />
          <a href="/login" className="ml-7 bg-blue-600 text-white px-5 py-2 rounded font-bold hover:bg-blue-700 transition">Login</a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center min-h-[60vh] pt-[7vh] pb-24 bg-gradient-to-b from-blue-100 to-gray-50 relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80" alt="School campus" className="absolute inset-0 w-full h-full object-cover opacity-60 z-0" />
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-400/65 to-white/70 z-0" />
        <div className="relative z-10 flex flex-col items-center w-full px-4">
          <motion.h1 
            initial={{ opacity: 0, y: -30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }} 
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-blue-800 mb-6 pt-4 md:pt-8 lg:pt-10"
            style={{ marginTop: 0 }}
          >
            Nurturing Minds, Building Futures
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.2 }} 
            className="text-base sm:text-lg md:text-xl text-gray-700 mb-10 max-w-2xl mx-auto px-2 md:px-0"
            style={{ marginTop: 0 }}
          >
            Welcome to Springfield Public School. Discover excellence, creativity, and a nurturing environment for every learner.
          </motion.p>
          <div className="flex flex-row gap-5 justify-center mb-2">
            <Link to="/admission">
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.3 }} className="bg-blue-600 text-white px-7 py-3 rounded-full font-semibold text-lg shadow-lg hover:bg-blue-700 transition cursor-pointer">Apply Now</motion.div>
            </Link>
            <Link to="/admin">
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.4 }} className="bg-green-600 text-white px-7 py-3 rounded-full font-semibold text-lg shadow-lg hover:bg-green-700 transition cursor-pointer">Admin Portal</motion.div>
            </Link>
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              onClick={handleStudentPortal}
              className="bg-purple-600 text-white px-7 py-3 rounded-full font-semibold text-lg shadow-lg hover:bg-purple-700 transition cursor-pointer"
            >Student Portal</motion.button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 text-center relative bg-white">
        <motion.h2 initial={{ opacity: 0, y: -15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-3xl font-bold text-blue-700 mb-5">About Us</motion.h2>
        <motion.p initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="text-lg text-gray-700 max-w-2xl mx-auto">Springfield Public School is dedicated to holistic education and fostering academic excellence, creativity, and character. Our faculty and state-of-the-art facilities nurture every child's growth.</motion.p>
      </section>

      {/* Academics with cards */}
      <section id="academics" className="py-16 px-4 bg-blue-50">
        <motion.h2 initial={{ opacity: 0, y: -15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-3xl font-bold text-blue-700 mb-10 text-center">Academics</motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <motion.div className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center border-t-8 border-blue-600">
            <BookOpen className="h-14 w-14 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold text-blue-700 mb-2">Primary School</h3>
            <p className="text-gray-600 text-center">Foundational learning for young minds, focusing on curiosity and core skills.</p>
          </motion.div>
          <motion.div className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center border-t-8 border-purple-500">
            <Users className="h-14 w-14 text-purple-500 mb-4" />
            <h3 className="text-xl font-bold text-purple-700 mb-2">Middle School</h3>
            <p className="text-gray-600 text-center">Expanding horizons with collaboration and critical thinking.</p>
          </motion.div>
          <motion.div className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center border-t-8 border-green-500">
            <Award className="h-14 w-14 text-green-500 mb-4" />
            <h3 className="text-xl font-bold text-green-700 mb-2">High School</h3>
            <p className="text-gray-600 text-center">Preparing students for higher education and future careers.</p>
          </motion.div>
        </div>
      </section>

      {/* Facilities with colored cards */}
      <section id="facilities" className="py-16 px-4 bg-white">
        <motion.h2 initial={{ opacity: 0, y: -15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-3xl font-bold text-blue-700 mb-10 text-center">Facilities</motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <motion.div className="bg-blue-50 rounded-xl shadow-md p-8 flex flex-col items-center border-t-8 border-blue-400">
            <Library className="h-14 w-14 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold text-blue-700 mb-2">Smart Classrooms</h3>
            <p className="text-gray-600 text-center">Digital boards and tech-enabled learning spaces.</p>
          </motion.div>
          <motion.div className="bg-green-50 rounded-xl shadow-md p-8 flex flex-col items-center border-t-8 border-green-400">
            <FlaskConical className="h-14 w-14 text-green-600 mb-4" />
            <h3 className="text-xl font-bold text-green-700 mb-2">Library & Labs</h3>
            <p className="text-gray-600 text-center">Extensive library, state-of-the-art science and computer labs.</p>
          </motion.div>
          <motion.div className="bg-purple-50 rounded-xl shadow-md p-8 flex flex-col items-center border-t-8 border-purple-400">
            <Trophy className="h-14 w-14 text-purple-600 mb-4" />
            <h3 className="text-xl font-bold text-purple-700 mb-2">Sports & Arts</h3>
            <p className="text-gray-600 text-center">Vibrant sports and creative arts for all-round growth.</p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 bg-blue-50">
        <motion.h2 initial={{ opacity: 0, y: -15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-3xl font-bold text-blue-700 mb-7 text-center">Contact Us</motion.h2>
        <div className="flex flex-col md:flex-row items-center gap-9 justify-center">
          <div className="flex flex-col items-start gap-6">
            <div className="flex items-center gap-3">
              <Phone className="h-6 w-6 text-blue-700" />
              <span className="text-lg text-gray-700 font-semibold">+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-6 w-6 text-blue-700" />
              <span className="text-lg text-gray-700 font-semibold">info@springfieldschool.edu.in</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-6 w-6 text-blue-700" />
              <span className="text-lg text-gray-700 font-semibold">123 Main Street, Springfield, India</span>
            </div>
            {/* Social icons */}
            <div className="flex gap-4 mt-3">
              <a href="#" className="text-blue-600 hover:text-blue-800"><Facebook /></a>
              <a href="#" className="text-blue-400 hover:text-blue-800"><Twitter /></a>
              <a href="#" className="text-pink-500 hover:text-blue-800"><Instagram /></a>
            </div>
          </div>
          {/* Map placeholder */}
          <div className="w-full md:w-[350px] h-[220px] rounded-xl bg-gray-300 flex items-center justify-center text-gray-600 font-semibold shadow-md mt-8 md:mt-0">
            <span>Map Embed Here</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-300 text-gray-600 py-6 text-center mt-auto">
        © 2025 Springfield Public School. All rights reserved.
      </footer>
    </div>
  );
}

