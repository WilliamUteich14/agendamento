import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function GET(request: Request) {
    try {

        const existingUsers = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                active: true,
                password: true
            }
        })

        return NextResponse.json({message: "Usuários listados com Sucesso.", existingUsers })
    } catch (error) {
        return NextResponse.json(
            { error: "Erro ao listar usuários"},
            { status: 400 }
        );
    }
}