import Hero from "@/components/section/Hero";
import Navbar from "@/components/section/Navbar";
import React from "react";

const HomePage = () => {
  return (
    <section className="max-w-7xl mx-auto">
      <Navbar />
      <Hero />
    </section>
  );
};

export default HomePage;
