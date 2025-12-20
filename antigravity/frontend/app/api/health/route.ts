import { NextResponse } from 'next/server'

export async function GET() {
    return NextResponse.json(
        {
            service: 'Antigravity AI',
            version: '1.0.0',
            status: 'operational',
            message: 'AI that makes thinking feel lighter',
            endpoints: {
                '/api/analyze': 'POST - Analyze text',
                '/api/health': 'GET - Health check'
            }
        },
        { status: 200 }
    )
}
