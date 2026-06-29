"use client";

import { motion } from "framer-motion";
import { Inbox } from "lucide-react";

import {
  TableRow,
  TableCell,
} from "@/components/ui/table";

const DataTableEmpty = ({
  colSpan = 1,
  title = "No data found",
  description = "There are no records to display at the moment.",
}) => {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="h-80 p-0">
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.4,
            ease: "easeOut",
          }}
          className="flex h-full flex-col items-center justify-center px-6 text-center"
        >
          {/* Animated Icon */}
          <motion.div
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100"
          >
            <Inbox className="h-10 w-10 text-slate-400" />
          </motion.div>

          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-lg font-semibold text-slate-800"
          >
            {title}
          </motion.h3>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="mt-2 max-w-sm text-sm text-slate-500"
          >
            {description}
          </motion.p>
        </motion.div>
      </TableCell>
    </TableRow>
  );
};

export default DataTableEmpty;