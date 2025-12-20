"""
Antigravity AI - Text Simplification Engine

Simplifies text by:
- Removing filler words
- Shortening verbose phrases
- Breaking down complex sentences
- Eliminating redundancy
"""

import re
from typing import List, Dict
from dataclasses import dataclass


@dataclass
class Change:
    type: str  # 'removed', 'simplified', 'reordered'
    description: str


@dataclass
class SimplifiedContent:
    original: str
    simplified: str
    reduction_percentage: int
    changes: List[Change]


def simplify_text(text: str) -> SimplifiedContent:
    """
    Simplify text by removing filler and reducing complexity
    """
    if not text or not text.strip():
        return SimplifiedContent(
            original='',
            simplified='',
            reduction_percentage=0,
            changes=[]
        )
    
    changes = []
    simplified = text
    
    # Remove filler words
    filler_words = [
        'basically', 'actually', 'literally', 'just', 'really',
        'very', 'quite', 'rather', 'somewhat'
    ]
    
    for filler in filler_words:
        pattern = re.compile(r'\b' + filler + r'\b', re.IGNORECASE)
        if pattern.search(simplified):
            simplified = pattern.sub('', simplified)
            changes.append(Change(
                type='removed',
                description=f'Removed filler word: "{filler}"'
            ))
    
    # Simplify verbose phrases
    replacements = {
        'in order to': 'to',
        'due to the fact that': 'because',
        'at this point in time': 'now',
        'for the purpose of': 'to',
        'in the event that': 'if',
        'with regard to': 'about',
        'take into consideration': 'consider',
        'make a decision': 'decide',
        'come to a conclusion': 'conclude',
        'at the present time': 'now',
    }
    
    for verbose, simple in replacements.items():
        pattern = re.compile(verbose, re.IGNORECASE)
        if pattern.search(simplified):
            simplified = pattern.sub(simple, simplified)
            changes.append(Change(
                type='simplified',
                description=f'"{verbose}" → "{simple}"'
            ))
    
    # Clean up extra whitespace
    simplified = re.sub(r'\s+', ' ', simplified).strip()
    
    # Calculate reduction
    reduction = max(0, round(((len(text) - len(simplified)) / len(text)) * 100))
    
    return SimplifiedContent(
        original=text,
        simplified=simplified,
        reduction_percentage=reduction,
        changes=changes
    )


def extract_next_action(text: str, gravity_level: str) -> Dict[str, str]:
    """
    Extract the single most important next action
    """
    sentences = [s.strip() for s in re.split(r'[.!?]+', text) if s.strip()]
    
    # Look for action verbs
    action_verbs = [
        'start', 'begin', 'create', 'write', 'send', 'call',
        'email', 'review', 'finish', 'complete', 'schedule'
    ]
    
    action_sentence = sentences[0] if sentences else ''
    
    for sentence in sentences:
        if any(verb in sentence.lower() for verb in action_verbs):
            action_sentence = sentence
            break
    
    # Simplify the action
    action = action_sentence[:100] if action_sentence else 'Take a moment to clarify your thoughts'
    
    # Determine priority
    priority = 'high' if gravity_level == 'heavy' else 'medium' if gravity_level == 'medium' else 'low'
    
    reasoning = (
        'High cognitive load detected. Focus on one thing at a time.'
        if gravity_level == 'heavy'
        else 'Start with the most concrete action to build momentum.'
    )
    
    return {
        'action': action,
        'reasoning': reasoning,
        'estimated_time': '5-15 min',
        'priority': priority
    }


if __name__ == '__main__':
    # Test the simplification
    test_text = """
    I basically need to actually finish the report in order to meet the deadline,
    and I really should take into consideration all the feedback that was provided.
    """
    
    result = simplify_text(test_text)
    print(f"Original: {result.original}")
    print(f"Simplified: {result.simplified}")
    print(f"Reduction: {result.reduction_percentage}%")
    print(f"Changes: {len(result.changes)}")
