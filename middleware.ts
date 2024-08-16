import { NextResponse, NextRequest } from 'next/server'

export function middleware(request: NextRequest, response: NextResponse) {}

export const config = {
    matcher: '/:path*',
}