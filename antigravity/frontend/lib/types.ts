export interface GravityScore {
    overall: number;
    breakdown: {
        complexity: number;
        emotion: number;
        taskCount: number;
        ambiguity: number;
        repetition: number;
    };
    level: 'light' | 'medium' | 'heavy';
}

export interface SimplifiedContent {
    original: string;
    simplified: string;
    reductionPercentage: number;
    changes: Array<{
        type: 'removed' | 'simplified' | 'reordered';
        description: string;
    }>;
}

export interface NextAction {
    action: string;
    reasoning: string;
    estimatedTime: string;
    priority: 'low' | 'medium' | 'high';
}

export interface AnalysisResult {
    gravityScore: GravityScore;
    simplified: SimplifiedContent;
    nextAction: NextAction;
    timestamp: number;
}
