import React from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground = () => {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-white">
            {/* Soft Gradient Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05),rgba(255,255,255,1))]" />

            {/* Floating Blur Shapes */}
            <motion.div
                animate={{
                    x: [0, 80, 0],
                    y: [0, 40, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute top-[-5%] left-[-5%] w-[45%] h-[45%] rounded-full bg-emerald-100/40 blur-[120px]"
            />

            <motion.div
                animate={{
                    x: [0, -60, 0],
                    y: [0, 100, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 22,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                }}
                className="absolute bottom-[5%] right-[-5%] w-[40%] h-[40%] rounded-full bg-blue-100/30 blur-[120px]"
            />

            <motion.div
                animate={{
                    x: [0, 40, 0],
                    y: [0, -80, 0],
                    scale: [1, 1.15, 1],
                }}
                transition={{
                    duration: 28,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 4
                }}
                className="absolute top-[30%] right-[15%] w-[30%] h-[30%] rounded-full bg-teal-50/50 blur-[90px]"
            />

            {/* Subtle Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)] opacity-10" />
        </div>
    );
};

export default AnimatedBackground;
