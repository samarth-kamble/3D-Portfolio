import Hero from "@/components/section/Hero";
import Navbar from "@/components/section/Navbar";
import React from "react";
import About from "@/components/section/About";

const HomePage = () => {
  return (
    <section className="max-w-7xl mx-auto">
      <Navbar />
      <Hero />
        <About  />

    </section>
  );
};

export default HomePage;
