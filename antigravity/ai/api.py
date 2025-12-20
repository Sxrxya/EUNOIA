"""
Antigravity AI - FastAPI Service

REST API for cognitive load analysis and text simplification
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, List
import uvicorn

from gravity_scoring import calculate_gravity_score
from simplifier import simplify_text, extract_next_action


app = FastAPI(
    title="Antigravity AI API",
    description="AI that makes thinking feel lighter",
    version="1.0.0"
)

# CORS middleware for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class AnalyzeRequest(BaseModel):
    text: str


class AnalyzeResponse(BaseModel):
    gravity_score: Dict
    simplified: Dict
    next_action: Dict
    timestamp: int


@app.get("/")
async def root():
    return {
        "service": "Antigravity AI",
        "status": "operational",
        "message": "AI that makes thinking feel lighter"
    }


@app.get("/health")
async def health_check():
    return {"status": "healthy"}


@app.post("/analyze", response_model=AnalyzeResponse)
async def analyze(request: AnalyzeRequest):
    """
    Analyze text and return cognitive gravity score, simplified version, and next action
    """
    if not request.text or not request.text.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty")
    
    try:
        # Calculate gravity score
        gravity = calculate_gravity_score(request.text)
        
        # Simplify text
        simplified = simplify_text(request.text)
        
        # Extract next action
        next_action = extract_next_action(request.text, gravity.level)
        
        import time
        
        return {
            "gravity_score": {
                "overall": gravity.overall,
                "breakdown": gravity.breakdown,
                "level": gravity.level
            },
            "simplified": {
                "original": simplified.original,
                "simplified": simplified.simplified,
                "reduction_percentage": simplified.reduction_percentage,
                "changes": [
                    {"type": c.type, "description": c.description}
                    for c in simplified.changes
                ]
            },
            "next_action": next_action,
            "timestamp": int(time.time() * 1000)
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
