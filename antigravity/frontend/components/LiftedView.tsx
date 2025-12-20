'use client';

import { motion } from 'framer-motion';
import { SimplifiedContent } from '@/lib/types';
import { useState } from 'react';

interface LiftedViewProps {
    content: SimplifiedContent | null;
}

export default function LiftedView({ content }: LiftedViewProps) {
    const [copied, setCopied] = useState(false);

    if (!content || content.simplified.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-effect rounded-2xl p-6 calm-shadow"
            >
                <h3 className="text-lg font-semibold text-zen-800 mb-4">
                    Lifted View
                </h3>
                <div className="flex flex-col items-center justify-center py-12 text-zen-400">
                    <svg className="w-16 h-16 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-sm">Your simplified content will appear here</p>
                </div>
            </motion.div>
        );
    }

    const handleCopy = async () => {
        await navigator.clipboard.writeText(content.simplified);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="glass-effect rounded-2xl p-6 calm-shadow"
        >
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-zen-800">
                    Lifted View
                </h3>
                <div className="flex items-center gap-3">
                    <span className="text-sm text-lift-600 font-medium">
                        {content.reductionPercentage}% lighter
                    </span>
                    <motion.button
                        onClick={handleCopy}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1.5 rounded-lg bg-calm-100 text-calm-700 text-sm font-medium hover:bg-calm-200 smooth-transition"
                    >
                        {copied ? '✓ Copied' : 'Copy'}
                    </motion.button>
                </div>
            </div>

            <div className="space-y-4">
                <div className="bg-gradient-to-br from-lift-50 to-calm-50 rounded-xl p-4 border border-lift-200">
                    <p className="text-zen-800 leading-relaxed whitespace-pre-wrap">
                        {content.simplified}
                    </p>
                </div>

                {content.changes.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ delay: 0.3 }}
                        className="space-y-2"
                    >
                        <h4 className="text-sm font-medium text-zen-700">What changed:</h4>
                        <div className="space-y-1">
                            {content.changes.slice(0, 5).map((change, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 + index * 0.1 }}
                                    className="flex items-start gap-2 text-xs text-zen-600"
                                >
                                    <span className={`
                    px-2 py-0.5 rounded-full text-xs font-medium
                    ${change.type === 'removed' ? 'bg-red-100 text-red-700' :
                                            change.type === 'simplified' ? 'bg-blue-100 text-blue-700' :
                                                'bg-purple-100 text-purple-700'}
                  `}>
                                        {change.type}
                                    </span>
                                    <span className="flex-1">{change.description}</span>
                                </motion.div>
                            ))}
                            {content.changes.length > 5 && (
                                <p className="text-xs text-zen-500 italic pl-2">
                                    +{content.changes.length - 5} more changes
                                </p>
                            )}
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}
