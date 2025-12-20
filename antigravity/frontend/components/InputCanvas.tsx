'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface InputCanvasProps {
    value: string;
    onChange: (value: string) => void;
    onAnalyze: () => void;
    isAnalyzing: boolean;
}

export default function InputCanvas({ value, onChange, onAnalyze, isAnalyzing }: InputCanvasProps) {
    const [isFocused, setIsFocused] = useState(false);
    const wordCount = value.trim().split(/\s+/).filter(w => w.length > 0).length;
    const charCount = value.length;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
        >
            <div className="glass-effect rounded-2xl p-6 calm-shadow">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-zen-800">
                        What's on your mind?
                    </h2>
                    <div className="flex items-center gap-4 text-sm text-zen-500">
                        <span>{wordCount} words</span>
                        <span>{charCount} characters</span>
                    </div>
                </div>

                <motion.textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Paste your thoughts, tasks, or problems here. The AI will help lighten the load..."
                    className={`
            w-full min-h-[200px] p-4 rounded-xl
            bg-white/50 border-2 
            ${isFocused ? 'border-calm-400' : 'border-zen-200'}
            focus:outline-none focus:border-calm-400
            resize-none text-zen-800 placeholder-zen-400
            smooth-transition font-normal text-base leading-relaxed
          `}
                    animate={{
                        scale: isFocused ? 1.01 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                />

                <div className="flex items-center justify-between mt-4">
                    <div className="text-xs text-zen-500 italic">
                        {value.length === 0
                            ? 'Start typing to see your cognitive gravity score'
                            : 'Press Analyze to reduce mental weight'
                        }
                    </div>

                    <motion.button
                        onClick={onAnalyze}
                        disabled={value.trim().length === 0 || isAnalyzing}
                        whileHover={{ scale: value.trim().length > 0 ? 1.05 : 1 }}
                        whileTap={{ scale: value.trim().length > 0 ? 0.95 : 1 }}
                        className={`
              px-6 py-3 rounded-xl font-medium
              smooth-transition
              ${value.trim().length > 0 && !isAnalyzing
                                ? 'bg-gradient-to-r from-calm-500 to-lift-500 text-white shadow-lg hover:shadow-xl'
                                : 'bg-zen-200 text-zen-400 cursor-not-allowed'
                            }
            `}
                    >
                        {isAnalyzing ? (
                            <span className="flex items-center gap-2">
                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        fill="none"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    />
                                </svg>
                                Analyzing...
                            </span>
                        ) : (
                            'Analyze & Lift'
                        )}
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}
