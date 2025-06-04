import { PrismaClient } from "@prisma/client";
import { error } from "console";
import { stat } from "fs";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const users = await prisma.task.findMany()
        return NextResponse.json(users)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = request.json()
        const { title } = body

        if (!title) {
            return NextResponse.json(
                { error: 'title is empty' },
                { status: 400 }
            )
        }
        const task = await prisma.task.create({
            data: {
                title
            }
        })
        return NextResponse.json({ task, status: 201 })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
    }
}
