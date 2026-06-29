import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const DashboardHeader = ({
  title,
  subtitle,
  buttons = [],
}) => {

  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
    >
      <div>
        <motion.h1
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="text-2xl font-bold tracking-tight"
        >
          {title.split(" ").map((word, index) => {
            const last = index === title.split(" ").length - 1;
            return (
              <span key={index} className={`inline-block ${last ? "bg-gradient-to-b from-[#3b52ab] to-[#1a2e7a] bg-clip-text text-transparent" : "mr-1"}`}>
                {word}
              </span>
            );
          })}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="mt-1 text-slate-500 font-medium"
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      {buttons.length > 0 && (
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.08,
                delayChildren: 0.25,
              },
            },
          }}
          className="flex items-center gap-2"
        >
          {buttons.map((button, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: {
                  opacity: 0,
                  y: -8,
                  scale: 0.95,
                },
                show: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                },
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                variant={button.variant || "default"}
                size={button.size || "default"}
                onClick={button.onClick}
                type={button.type || "button"}
              >
                {button.icon && <button.icon className="h-4 w-4" />}
                {button.label}
              </Button>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default DashboardHeader;