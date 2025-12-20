'use client';

import { motion } from 'framer-motion';
import { GravityScore } from '@/lib/types';
import { useEffect, useState } from 'react';

interface GravityMeterProps {
    score: GravityScore | null;
}

export default function GravityMeter({ score }: GravityMeterProps) {
    const [displayScore, setDisplayScore] = useState(0);

    useEffect(() => {
        if (score) {
            const timer = setTimeout(() => {
                setDisplayScore(score.overall);
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [score]);

    if (!score) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-effect rounded-2xl p-6 calm-shadow"
            >
                <div className="flex flex-col items-center justify-center py-8">
                    <div className="w-32 h-32 rounded-full border-4 border-zen-200 flex items-center justify-center">
                        <span className="text-4xl text-zen-300">—</span>
                    </div>
                    <p className="mt-4 text-zen-500 text-sm">Waiting for input...</p>
                </div>
            </motion.div>
        );
    }

    const getColor = () => {
        if (score.level === 'light') return 'text-gravity-light';
        if (score.level === 'medium') return 'text-gravity-medium';
        return 'text-gravity-heavy';
    };

    const getGradient = () => {
        if (score.level === 'light') return 'from-gravity-light to-lift-400';
        if (score.level === 'medium') return 'from-gravity-medium to-amber-400';
        return 'from-gravity-heavy to-red-600';
    };

    const circumference = 2 * Math.PI * 58;
    const offset = circumference - (displayScore / 100) * circumference;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="glass-effect rounded-2xl p-6 calm-shadow"
        >
            <h3 className="text-lg font-semibold text-zen-800 mb-4">
                Cognitive Gravity Score
            </h3>

            <div className="flex flex-col items-center">
                <div className="relative w-40 h-40">
                    <svg className="transform -rotate-90 w-40 h-40">
                        <circle
                            cx="80"
                            cy="80"
                            r="58"
                            stroke="currentColor"
                            strokeWidth="12"
                            fill="none"
                            className="text-zen-200"
                        />
                        <motion.circle
                            cx="80"
                            cy="80"
                            r="58"
                            stroke="url(#gradient)"
                            strokeWidth="12"
                            fill="none"
                            strokeLinecap="round"
                            initial={{ strokeDashoffset: circumference }}
                            animate={{ strokeDashoffset: offset }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            style={{
                                strokeDasharray: circumference,
                            }}
                        />
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop
                                    offset="0%"
                                    className={score.level === 'light' ? 'text-gravity-light' : score.level === 'medium' ? 'text-gravity-medium' : 'text-gravity-heavy'}
                                    style={{ stopColor: 'currentColor' }}
                                />
                                <stop
                                    offset="100%"
                                    className={score.level === 'light' ? 'text-lift-400' : score.level === 'medium' ? 'text-amber-400' : 'text-red-600'}
                                    style={{ stopColor: 'currentColor' }}
                                />
                            </linearGradient>
                        </defs>
                    </svg>

                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <motion.span
                            key={displayScore}
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className={`text-4xl font-bold ${getColor()}`}
                        >
                            {displayScore}
                        </motion.span>
                        <span className="text-xs text-zen-500 uppercase tracking-wide mt-1">
                            {score.level}
                        </span>
                    </div>
                </div>

                <div className="mt-6 w-full space-y-2">
                    <ScoreBreakdown label="Complexity" value={score.breakdown.complexity} />
                    <ScoreBreakdown label="Emotion" value={score.breakdown.emotion} />
                    <ScoreBreakdown label="Task Count" value={score.breakdown.taskCount} />
                    <ScoreBreakdown label="Ambiguity" value={score.breakdown.ambiguity} />
                    <ScoreBreakdown label="Repetition" value={score.breakdown.repetition} />
                </div>
            </div>
        </motion.div>
    );
}

function ScoreBreakdown({ label, value }: { label: string; value: number }) {
    return (
        <div className="flex items-center justify-between text-sm">
            <span className="text-zen-600">{label}</span>
            <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-zen-200 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${value}%` }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className={`h-full ${value < 33 ? 'bg-gravity-light' :
                                value < 66 ? 'bg-gravity-medium' :
                                    'bg-gravity-heavy'
                            }`}
                    />
                </div>
                <span className="text-zen-500 w-8 text-right">{value}</span>
            </div>
        </div>
    );
}
