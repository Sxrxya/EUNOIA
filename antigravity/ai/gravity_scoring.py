"""
Antigravity AI - Cognitive Gravity Scoring Engine

Calculates mental weight based on:
- Sentence complexity
- Emotional intensity
- Task count
- Ambiguity
- Repetition
"""

import re
from typing import Dict, List
from dataclasses import dataclass


@dataclass
class GravityScore:
    overall: int
    breakdown: Dict[str, int]
    level: str


def calculate_gravity_score(text: str) -> GravityScore:
    """
    Calculate cognitive gravity score (0-100)
    Higher score = more mental weight
    """
    if not text or not text.strip():
        return GravityScore(
            overall=0,
            breakdown={
                'complexity': 0,
                'emotion': 0,
                'task_count': 0,
                'ambiguity': 0,
                'repetition': 0
            },
            level='light'
        )
    
    sentences = [s.strip() for s in re.split(r'[.!?]+', text) if s.strip()]
    words = [w for w in text.split() if w]
    
    # 1. Sentence Complexity (0-100)
    avg_words_per_sentence = len(words) / max(len(sentences), 1)
    complexity_score = min(100, (avg_words_per_sentence / 20) * 100)
    
    # 2. Emotional Intensity (0-100)
    stress_keywords = [
        'urgent', 'asap', 'immediately', 'critical', 'emergency',
        'worried', 'anxious', 'stressed', 'overwhelmed', 'confused', 'frustrated'
    ]
    emotion_matches = sum(1 for keyword in stress_keywords if keyword in text.lower())
    emotion_score = min(100, (emotion_matches / 3) * 100)
    
    # 3. Task Count (0-100)
    task_indicators = len(re.findall(
        r'\b(need to|have to|must|should|todo|task|action item)\b',
        text,
        re.IGNORECASE
    ))
    bullet_points = len(re.findall(r'^[-*•]\s', text, re.MULTILINE))
    total_tasks = task_indicators + bullet_points
    task_score = min(100, (total_tasks / 10) * 100)
    
    # 4. Ambiguity (0-100)
    vague_words = ['maybe', 'perhaps', 'possibly', 'might', 'could', 'unclear', 'not sure', 'confused']
    questions = text.count('?')
    ambiguity_matches = sum(1 for word in vague_words if word in text.lower())
    ambiguity_score = min(100, ((ambiguity_matches + questions) / 5) * 100)
    
    # 5. Repetition (0-100)
    word_freq = {}
    for word in words:
        normalized = re.sub(r'[^a-z0-9]', '', word.lower())
        if len(normalized) > 3:
            word_freq[normalized] = word_freq.get(normalized, 0) + 1
    
    repeated_words = sum(1 for count in word_freq.values() if count > 2)
    repetition_score = min(100, (repeated_words / 5) * 100)
    
    # Weighted overall score
    overall = round(
        complexity_score * 0.25 +
        emotion_score * 0.20 +
        task_score * 0.25 +
        ambiguity_score * 0.15 +
        repetition_score * 0.15
    )
    
    level = 'light' if overall < 33 else 'medium' if overall < 66 else 'heavy'
    
    return GravityScore(
        overall=overall,
        breakdown={
            'complexity': round(complexity_score),
            'emotion': round(emotion_score),
            'task_count': round(task_score),
            'ambiguity': round(ambiguity_score),
            'repetition': round(repetition_score)
        },
        level=level
    )


if __name__ == '__main__':
    # Test the scoring system
    test_text = """
    I need to finish the quarterly report by tomorrow but I'm also supposed to 
    review the new marketing proposals and maybe I should also look at the budget 
    spreadsheet that Sarah sent last week. I'm really stressed about the presentation 
    on Friday and I'm not sure if I should focus on the slides first or the data analysis.
    """
    
    score = calculate_gravity_score(test_text)
    print(f"Overall Score: {score.overall}")
    print(f"Level: {score.level}")
    print(f"Breakdown: {score.breakdown}")
