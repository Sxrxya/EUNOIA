'use client';

import { motion } from 'framer-motion';
import { NextAction } from '@/lib/types';

interface NextLightActionProps {
    action: NextAction | null;
    onAccept?: () => void;
    onDefer?: () => void;
}

export default function NextLightAction({ action, onAccept, onDefer }: NextLightActionProps) {
    if (!action) {
        return null;
    }

    const getPriorityColor = () => {
        switch (action.priority) {
            case 'high': return 'from-red-500 to-orange-500';
            case 'medium': return 'from-amber-500 to-yellow-500';
            case 'low': return 'from-lift-500 to-calm-500';
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="glass-effect rounded-2xl p-6 calm-shadow"
        >
            <div className="flex items-center gap-2 mb-4">
                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${getPriorityColor()}`} />
                <h3 className="text-lg font-semibold text-zen-800">
                    Next Light Action
                </h3>
                <span className="ml-auto text-xs text-zen-500 bg-zen-100 px-2 py-1 rounded-full">
                    {action.estimatedTime}
                </span>
            </div>

            <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-br from-white to-calm-50 rounded-xl p-5 border-2 border-calm-200 mb-4"
            >
                <p className="text-zen-800 font-medium text-lg mb-3 leading-relaxed">
                    {action.action}
                </p>
                <p className="text-zen-600 text-sm italic">
                    {action.reasoning}
                </p>
            </motion.div>

            <div className="flex gap-3">
                <motion.button
                    onClick={onAccept}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-lift-500 to-calm-500 text-white font-medium shadow-lg hover:shadow-xl smooth-transition"
                >
                    ✓ Start This
                </motion.button>
                <motion.button
                    onClick={onDefer}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 rounded-xl bg-zen-100 text-zen-700 font-medium hover:bg-zen-200 smooth-transition"
                >
                    Defer
                </motion.button>
            </div>
        </motion.div>
    );
}
