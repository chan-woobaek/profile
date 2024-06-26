"use client"
import React, { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { InitialNavbar } from "./_components/initial-navbar";
import { Landing } from "./_components/landing";

export default function Index() {
  const pageRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end start"],
  });

  return (
    <motion.div className="overflow-scroll" ref={pageRef}>
      <InitialNavbar scrollYProgress={scrollYProgress} />
      <Landing/>
    </motion.div>
  );
}
