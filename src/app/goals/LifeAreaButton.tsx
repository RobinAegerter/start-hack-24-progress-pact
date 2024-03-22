"use client";

import { LifeArea } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import { bgColors } from "./bgColors";

function LifeAreaButton({
  children,
  achievedPercentage,
  lifeArea,
  onClick,
}: {
  children?: JSX.Element;
  achievedPercentage: number;
  lifeArea: LifeArea;
  onClick?: () => void;
}) {
  return (
    <motion.button
      className={`p-3 text-xl rounded-md transition-colors relative ${
        bgColors.find((c) => c.lifeArea === lifeArea)?.background
      } w-1/4 box-border mx-2 h-24 border flex justify-end items-end`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <span className="block relative z-10">{children}</span>
      <AnimatePresence>
        <motion.span
          className={`absolute inset-0 rounded-md ${
            bgColors.find((c) => c.lifeArea === lifeArea)?.foreground
          }  z-0`}
          initial={{
            scaleY: 0,
            translateX: isNaN(achievedPercentage)
              ? 0
              : achievedPercentage / 100,
          }}
          animate={{
            transform: `scaleY(${
              isNaN(achievedPercentage) ? 0 : achievedPercentage / 100
            })`,
            transformOrigin: "bottom",
          }}
          exit={{ scale: 0 }}
        ></motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
export default LifeAreaButton;
