import { GravityScore, SimplifiedContent, NextAction, AnalysisResult } from './types';

/**
 * Calculate cognitive gravity score (0-100)
 * Higher score = more mental weight
 */
export function calculateGravityScore(text: string): GravityScore {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const words = text.split(/\s+/).filter(w => w.length > 0);

    // 1. Sentence Complexity (0-100)
    const avgWordsPerSentence = words.length / Math.max(sentences.length, 1);
    const complexityScore = Math.min(100, (avgWordsPerSentence / 20) * 100);

    // 2. Emotional Intensity (0-100)
    const stressKeywords = ['urgent', 'asap', 'immediately', 'critical', 'emergency', 'worried', 'anxious', 'stressed', 'overwhelmed', 'confused', 'frustrated'];
    const emotionMatches = stressKeywords.filter(keyword =>
        text.toLowerCase().includes(keyword)
    ).length;
    const emotionScore = Math.min(100, (emotionMatches / 3) * 100);

    // 3. Task Count (0-100)
    const taskIndicators = text.match(/\b(need to|have to|must|should|todo|task|action item)/gi) || [];
    const bulletPoints = text.match(/^[-*•]\s/gm) || [];
    const totalTasks = taskIndicators.length + bulletPoints.length;
    const taskScore = Math.min(100, (totalTasks / 10) * 100);

    // 4. Ambiguity (0-100)
    const vagueWords = ['maybe', 'perhaps', 'possibly', 'might', 'could', 'unclear', 'not sure', 'confused'];
    const questions = (text.match(/\?/g) || []).length;
    const ambiguityMatches = vagueWords.filter(word =>
        text.toLowerCase().includes(word)
    ).length;
    const ambiguityScore = Math.min(100, ((ambiguityMatches + questions) / 5) * 100);

    // 5. Repetition (0-100)
    const wordFrequency = new Map<string, number>();
    words.forEach(word => {
        const normalized = word.toLowerCase().replace(/[^a-z0-9]/g, '');
        if (normalized.length > 3) {
            wordFrequency.set(normalized, (wordFrequency.get(normalized) || 0) + 1);
        }
    });
    const repeatedWords = Array.from(wordFrequency.values()).filter(count => count > 2).length;
    const repetitionScore = Math.min(100, (repeatedWords / 5) * 100);

    // Weighted overall score
    const overall = Math.round(
        complexityScore * 0.25 +
        emotionScore * 0.20 +
        taskScore * 0.25 +
        ambiguityScore * 0.15 +
        repetitionScore * 0.15
    );

    const level = overall < 33 ? 'light' : overall < 66 ? 'medium' : 'heavy';

    return {
        overall,
        breakdown: {
            complexity: Math.round(complexityScore),
            emotion: Math.round(emotionScore),
            taskCount: Math.round(taskScore),
            ambiguity: Math.round(ambiguityScore),
            repetition: Math.round(repetitionScore),
        },
        level,
    };
}

/**
 * Simplify text by removing filler, shortening sentences, and reducing complexity
 */
export function simplifyText(text: string): SimplifiedContent {
    const changes: SimplifiedContent['changes'] = [];
    let simplified = text;

    // Remove filler words
    const fillerWords = ['basically', 'actually', 'literally', 'just', 'really', 'very', 'quite', 'rather', 'somewhat'];
    fillerWords.forEach(filler => {
        const regex = new RegExp(`\\b${filler}\\b`, 'gi');
        if (regex.test(simplified)) {
            simplified = simplified.replace(regex, '');
            changes.push({
                type: 'removed',
                description: `Removed filler word: "${filler}"`,
            });
        }
    });

    // Simplify common verbose phrases
    const replacements: Record<string, string> = {
        'in order to': 'to',
        'due to the fact that': 'because',
        'at this point in time': 'now',
        'for the purpose of': 'to',
        'in the event that': 'if',
        'with regard to': 'about',
        'take into consideration': 'consider',
    };

    Object.entries(replacements).forEach(([verbose, simple]) => {
        const regex = new RegExp(verbose, 'gi');
        if (regex.test(simplified)) {
            simplified = simplified.replace(regex, simple);
            changes.push({
                type: 'simplified',
                description: `"${verbose}" → "${simple}"`,
            });
        }
    });

    // Clean up extra whitespace
    simplified = simplified.replace(/\s+/g, ' ').trim();

    // Calculate reduction
    const reductionPercentage = Math.round(
        ((text.length - simplified.length) / text.length) * 100
    );

    return {
        original: text,
        simplified,
        reductionPercentage: Math.max(0, reductionPercentage),
        changes,
    };
}

/**
 * Extract the single most important next action
 */
export function extractNextAction(text: string, gravityScore: GravityScore): NextAction {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);

    // Look for action verbs
    const actionVerbs = ['start', 'begin', 'create', 'write', 'send', 'call', 'email', 'review', 'finish', 'complete'];

    let actionSentence = sentences[0]; // Default to first sentence

    for (const sentence of sentences) {
        const hasActionVerb = actionVerbs.some(verb =>
            sentence.toLowerCase().includes(verb)
        );
        if (hasActionVerb) {
            actionSentence = sentence;
            break;
        }
    }

    // Simplify the action
    const action = actionSentence.trim().substring(0, 100);

    // Determine priority based on gravity score
    const priority = gravityScore.overall > 66 ? 'high' :
        gravityScore.overall > 33 ? 'medium' : 'low';

    return {
        action: action || 'Take a moment to breathe and clarify your thoughts',
        reasoning: gravityScore.overall > 66
            ? 'High cognitive load detected. Focus on one thing at a time.'
            : 'Start with the most concrete action to build momentum.',
        estimatedTime: '5-15 min',
        priority,
    };
}

/**
 * Main analysis function
 */
export function analyzeText(text: string): AnalysisResult {
    if (!text || text.trim().length === 0) {
        return {
            gravityScore: {
                overall: 0,
                breakdown: {
                    complexity: 0,
                    emotion: 0,
                    taskCount: 0,
                    ambiguity: 0,
                    repetition: 0,
                },
                level: 'light',
            },
            simplified: {
                original: '',
                simplified: '',
                reductionPercentage: 0,
                changes: [],
            },
            nextAction: {
                action: 'Start by writing down your thoughts',
                reasoning: 'An empty mind is a light mind',
                estimatedTime: '2 min',
                priority: 'low',
            },
            timestamp: Date.now(),
        };
    }

    const gravityScore = calculateGravityScore(text);
    const simplified = simplifyText(text);
    const nextAction = extractNextAction(text, gravityScore);

    return {
        gravityScore,
        simplified,
        nextAction,
        timestamp: Date.now(),
    };
}
