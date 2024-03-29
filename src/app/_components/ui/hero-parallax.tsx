"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ThreeDCard } from "../card";

export const HeroParallax = ({
  products,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: any;
  }[];
}) => {
  const firstRow = products.slice(0, 3);
  const secondRow = products.slice(3, 6);
  const thirdRow = products.slice(6, 9);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 400]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -400]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.1], [0.1, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-200, 200]),
    springConfig
  );
  return (
    <motion.div
      style={{
        rotateX,
        rotateZ,
        translateY,
        opacity,
      }}
      className="py-40 overflow-auto antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
      >
      <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-40">
        {firstRow.map((product) => (
          <ProductCard
            product={product}
            translate={translateXReverse}
            key={product.title}
          />
        ))}
      </motion.div>
      <motion.div className="flex flex-row mb-20 space-x-20 ">
        {secondRow.map((product) => (
          <ProductCard
            product={product}
            translate={translateX}
            key={product.title}
          />
        ))}
      </motion.div>
      <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
        {thirdRow.map((product) => (
          <ProductCard
            product={product}
            translate={translateXReverse}
            key={product.title}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product h-96 w-[30rem] relative flex-shrink-0"
    >
      <ThreeDCard
        title={product.title}
        description={""}
        imgSrc={product.thumbnail}
        buttonTwo="Find out more"
        buttonTwoLink={product.link}
      />
    </motion.div>
  );
};
