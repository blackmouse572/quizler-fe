'use client'
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";
type BoxProps = {
    row?: number;
    col?: number;
} & React.HTMLAttributes<HTMLDivElement>;
export const BoxesCore = ({ className, row = 50, col = 50, ...rest }: BoxProps) => {
    const rows = new Array(row).fill(1);
    const cols = new Array(col).fill(1);
    let colors = [
        "--slate-200",
        "--slate-300",
        "--slate-100",
    ];

    const getRandomColor = () => {
        return colors[Math.floor(Math.random() * colors.length)];
    };

    return (
        <div
            style={{
                transform: `translate(-40%, -59%) skewX(-34deg) skewY(0deg) scale(0.675) rotate(0deg) translateZ(0px)`,
            }}
            className={cn(
                "absolute left-1/4 p-4 -top-1/4 flex -translate-x-1/2 -translate-y-1/2 w-full h-full z-0 ",
                className
            )}
            {...rest}
        >
            {rows.map((_, i) => (
                <motion.div
                    key={`row` + i}
                    className="order-l border-slate-200 relative"
                >
                    {cols.map((_, j) => (
                        <motion.div
                            whileHover={{
                                backgroundColor: `var(${getRandomColor()})`,
                                transition: { duration: 0, ease: "easeOut" },
                            }}
                            animate={{
                                transition: { duration: 5000 },
                            }}
                            key={`col` + j}
                            className="w-20 h-32  border-r border-t border-slate-200 relative"
                            style={{
                                borderRadius: '14px 14px'
                            }}
                        >
                            {j % 2 === 0 && i % 2 === 0 ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="absolute h-6 w-10 -top-[14px] -left-[22px] text-slate-500 stroke-[1px] pointer-events-none rounded-md"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 6v12m6-6H6"
                                    />
                                </svg>
                            ) : null}
                        </motion.div>
                    ))}
                </motion.div>
            ))}
        </div>
    );
};

export const Boxes = React.memo(BoxesCore);
