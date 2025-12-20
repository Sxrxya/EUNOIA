import { NextRequest, NextResponse } from 'next/server'
import { analyzeText } from '@/lib/antigravity'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { text, saveToHistory = false } = body

        if (!text || typeof text !== 'string') {
            return NextResponse.json(
                { error: { code: 'VALIDATION_ERROR', message: 'Text is required' } },
                { status: 400 }
            )
        }

        if (text.length > 10000) {
            return NextResponse.json(
                { error: { code: 'VALIDATION_ERROR', message: 'Text too long (max 10000 characters)' } },
                { status: 400 }
            )
        }

        // Perform analysis
        const result = analyzeText(text)

        // TODO: If saveToHistory is true and user is authenticated, save to database
        // This will be implemented when Supabase is configured

        return NextResponse.json(result)
    } catch (error) {
        console.error('Analysis error:', error)
        return NextResponse.json(
            { error: { code: 'INTERNAL_ERROR', message: 'Analysis failed' } },
            { status: 500 }
        )
    }
}

export async function GET() {
    return NextResponse.json(
        {
            message: 'Antigravity AI Analysis API',
            endpoints: {
                POST: '/api/analyze - Analyze text and get cognitive gravity score'
            }
        },
        { status: 200 }
    )
}
