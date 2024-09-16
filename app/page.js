import Hero from "@/components/section/Hero";
import Navbar from "@/components/section/Navbar";
import React from "react";
import About from "@/components/section/About";
import Project from "@/components/section/Project";

const HomePage = () => {
  return (
    <section className="max-w-7xl mx-auto">
      <Navbar />
      <Hero />
        <About  />
        <Project />
    </section>
  );
};

export default HomePage;
