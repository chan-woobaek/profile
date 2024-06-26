"use client";

import { cn } from "../../utils/cn";
import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { useEffect } from "react";

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
  delay,
  lastLine,
  textClassName,
  repeat,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
  delay?: number;
  lastLine?: boolean;
  textClassName?: string;
  repeat?: number;
}) => {
  // split text inside of words into array of characters
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(""),
    };
  });
  const wordLength = words.length
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);

  function timeout(delay: number) {
    return new Promise( res => setTimeout(res, delay) );
  }
  async function delayFunction(delay: number) {
    await timeout(delay);
    animate(
      "span",
      {
        display: "inline-block",
        opacity: 1,
        width: "fit-content",
        height: "fit-content",
      },
      {
        duration: 0.2,
        delay: stagger(0.09),
        ease: "easeInOut",
      }
    );
  }
  useEffect(() => {
    if (isInView) {
      if(delay) {
        delayFunction(delay);
      } else
      animate(
        "span",
        {
          display: "inline-block",
          opacity: 1,
          width: "fit-content",
          height: "fit-content",
        },
        {
          duration: 0.2,
          delay: stagger(0.09),
          ease: "easeInOut",
        }
      );
    }
  }, [isInView]);

  const renderWords = () => {
    return (
      <motion.div ref={scope} className="flex">
        {wordsArray.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="flex w-auto">
              {word.text.map((char, index) => (
                <motion.span
                  initial={{}}
                  key={`char-${index}`}
                  className={cn(
                    `dark:text-white text-black opacity-0 hidden w-0`,
                    word.className
                  )}
                >
                  {char}
                </motion.span>
              ))}
              {idx != wordLength - 1 && <motion.span
                  initial={{}}
                  className={cn(
                    `dark:text-white text-black opacity-0 hidden w-0`,
                    word.className
                  )}
                >
                  &nbsp;
                </motion.span>}
            </div>
          );
        })}
        <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          repeat: lastLine ? Infinity : repeat,
          repeatType: "reverse",
        }}
        className={cn(
          "flex rounded-sm w-[5px] bg-blue-500",
          cursorClassName
        )}
      ></motion.div>
      </motion.div>
    );
  };
  return (
    <div
      className={cn(
        `inline-flex text-base ${textClassName} text-center justify-left w-[70vw]`,
        className
      )}
    >
      {renderWords()}
      
    </div>
  );
};

