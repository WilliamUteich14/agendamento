import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

export const UserSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, "Nome é obrigatório"),
    email: z.string().email("E-mail inválido"),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
    role: z.enum(["user", "admin"]).default("user"),
    active: z.boolean().default(true),
});

export async function POST(request: Request) {

    try {
        const body = await request.json();
        const parsed = UserSchema.parse(body);

        const existingUser = await prisma.user.findUnique({
            where: {
                email: parsed.email,
            }
        })

        if (existingUser) {
            return NextResponse.json({ error: "Usuário já cadastrado" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(parsed.password, 10);

        console.log("crptou>>>>>>>>", hashedPassword)

        await prisma.user.create({
            data: {
                ...parsed,
                password: hashedPassword,
            },
        });

        return NextResponse.json({ message: "Usuário criado com Sucesso", status: 201 });

    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: "Erro de validação", details: error.errors },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: "Erro ao criar usuário." },
            { status: 500 }
        );
    }
}