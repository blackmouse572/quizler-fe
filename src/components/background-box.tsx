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
                "absolute -top-1/4 left-1/4 z-0 flex h-full w-full -translate-x-1/2 -translate-y-1/2 p-4 ",
                className
            )}
            {...rest}
        >
            {rows.map((_, i) => (
                <motion.div
                    key={`row` + i}
                    className="order-l relative border-slate-200"
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
                            className="relative h-32  w-20 border-r border-t border-slate-200"
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
                                    className="pointer-events-none absolute left-[-22px] top-[-14px] h-6 w-10 rounded-md stroke-[1px] text-slate-500"
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
