"""
Unit tests for Antigravity AI gravity scoring
"""

import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from gravity_scoring import calculate_gravity_score


def test_empty_text():
    """Test that empty text returns zero score"""
    score = calculate_gravity_score("")
    assert score.overall == 0
    assert score.level == 'light'


def test_simple_text():
    """Test that simple text has low score"""
    text = "I will write the report today."
    score = calculate_gravity_score(text)
    assert score.overall < 50
    assert score.level in ['light', 'medium']


def test_complex_text():
    """Test that complex, stressful text has high score"""
    text = """
    I need to finish the quarterly report by tomorrow but I'm also supposed to 
    review the new marketing proposals and maybe I should also look at the budget 
    spreadsheet that Sarah sent last week. I'm really stressed about the presentation 
    on Friday and I'm not sure if I should focus on the slides first or the data analysis.
    There's also the team meeting at 3pm that I need to prepare for and I haven't even 
    started on the client emails that are piling up. I feel overwhelmed and I don't know 
    where to start. Should I work on everything at once or focus on one thing? 
    I'm really anxious about missing deadlines.
    """
    score = calculate_gravity_score(text)
    assert score.overall > 50
    assert score.level in ['medium', 'heavy']
    assert score.breakdown['emotion'] > 0
    assert score.breakdown['task_count'] > 0


def test_score_breakdown():
    """Test that all breakdown components are present"""
    text = "I need to urgently finish this task but I'm not sure how."
    score = calculate_gravity_score(text)
    
    assert 'complexity' in score.breakdown
    assert 'emotion' in score.breakdown
    assert 'task_count' in score.breakdown
    assert 'ambiguity' in score.breakdown
    assert 'repetition' in score.breakdown


def test_stress_keywords():
    """Test that stress keywords increase emotion score"""
    calm_text = "I will complete the task today."
    stressed_text = "I'm extremely stressed and overwhelmed. This is urgent and critical!"
    
    calm_score = calculate_gravity_score(calm_text)
    stressed_score = calculate_gravity_score(stressed_text)
    
    assert stressed_score.breakdown['emotion'] > calm_score.breakdown['emotion']


if __name__ == '__main__':
    print("Running tests...")
    test_empty_text()
    print("[PASS] Empty text test passed")
    
    test_simple_text()
    print("[PASS] Simple text test passed")
    
    test_complex_text()
    print("[PASS] Complex text test passed")
    
    test_score_breakdown()
    print("[PASS] Score breakdown test passed")
    
    test_stress_keywords()
    print("[PASS] Stress keywords test passed")
    
    print("\n[SUCCESS] All tests passed!")

