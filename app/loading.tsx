"use client";

import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-white px-6">
      <motion.div
        className="flex flex-col items-center gap-4"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="h-12 w-12 rounded-full border-4 border-surface border-t-brand"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
        />
        <motion.p
          className="text-copy font-medium uppercase tracking-copy text-black/60"
          animate={{ opacity: [0.45, 1, 0.45] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        >
          Loading...
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Loading;
