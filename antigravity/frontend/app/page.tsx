'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InputCanvas from '@/components/InputCanvas';
import GravityMeter from '@/components/GravityMeter';
import LiftedView from '@/components/LiftedView';
import NextLightAction from '@/components/NextLightAction';
import { analyzeText } from '@/lib/antigravity';
import { AnalysisResult } from '@/lib/types';

export default function Home() {
    const [inputText, setInputText] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [showDemo, setShowDemo] = useState(false);

    const handleAnalyze = async () => {
        setIsAnalyzing(true);

        // Simulate API delay for better UX
        await new Promise(resolve => setTimeout(resolve, 1000));

        const analysis = analyzeText(inputText);
        setResult(analysis);
        setIsAnalyzing(false);
    };

    const loadDemoContent = () => {
        const demoText = `I need to finish the quarterly report by tomorrow but I'm also supposed to review the new marketing proposals and maybe I should also look at the budget spreadsheet that Sarah sent last week. I'm really stressed about the presentation on Friday and I'm not sure if I should focus on the slides first or the data analysis. There's also the team meeting at 3pm that I need to prepare for and I haven't even started on the client emails that are piling up. I feel overwhelmed and I don't know where to start. Should I work on everything at once or focus on one thing? I'm really anxious about missing deadlines.`;

        setInputText(demoText);
        setShowDemo(true);

        setTimeout(() => {
            const analysis = analyzeText(demoText);
            setResult(analysis);
        }, 500);
    };

    const handleReset = () => {
        setInputText('');
        setResult(null);
        setShowDemo(false);
    };

    return (
        <main className="min-h-screen p-6 md:p-12">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.header
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-block"
                    >
                        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-calm-600 via-lift-600 to-calm-600 bg-clip-text text-transparent mb-4">
                            Antigravity
                        </h1>
                    </motion.div>
                    <p className="text-xl text-zen-600 mb-2">
                        AI that makes thinking feel lighter
                    </p>
                    <p className="text-sm text-zen-500 max-w-2xl mx-auto">
                        Detects cognitive overload and actively reduces mental weight.
                        No more information overwhelm—just clarity.
                    </p>

                    <div className="flex items-center justify-center gap-4 mt-6">
                        <motion.button
                            onClick={loadDemoContent}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 rounded-lg bg-calm-100 text-calm-700 text-sm font-medium hover:bg-calm-200 smooth-transition"
                        >
                            Load Demo
                        </motion.button>
                        {result && (
                            <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                onClick={handleReset}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-4 py-2 rounded-lg bg-zen-100 text-zen-700 text-sm font-medium hover:bg-zen-200 smooth-transition"
                            >
                                Reset
                            </motion.button>
                        )}
                    </div>
                </motion.header>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Input */}
                    <div className="lg:col-span-2 space-y-6">
                        <InputCanvas
                            value={inputText}
                            onChange={setInputText}
                            onAnalyze={handleAnalyze}
                            isAnalyzing={isAnalyzing}
                        />

                        <AnimatePresence>
                            {result && (
                                <LiftedView content={result.simplified} />
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Right Column - Analysis */}
                    <div className="space-y-6">
                        <GravityMeter score={result?.gravityScore || null} />

                        <AnimatePresence>
                            {result && (
                                <NextLightAction
                                    action={result.nextAction}
                                    onAccept={() => {
                                        alert('Great! Focus on this one action. You got this! 💪');
                                    }}
                                    onDefer={() => {
                                        alert('No problem. Take a breath and come back when ready. 🌊');
                                    }}
                                />
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Footer */}
                <motion.footer
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-16 text-center text-sm text-zen-500"
                >
                    <p>Built with Next.js, TailwindCSS, and Framer Motion</p>
                    <p className="mt-2">
                        Antigravity AI • Reducing cognitive load, one thought at a time
                    </p>
                </motion.footer>
            </div>
        </main>
    );
}
