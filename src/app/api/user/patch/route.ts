import { NextResponse } from "next/server";
import { PrismaClient, type Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
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

export const UserUpdateSchema = UserSchema.partial().extend({
    id: z.string().min(1, "ID é obrigatório para atualizar"),
});


export async function PATCH(request: Request) {
    try {
        const body = await request.json();
        const parsed = UserUpdateSchema.parse(body);

        const { id, password, ...rest } = parsed;

        let updatedData: Prisma.UserUpdateInput = { ...rest };

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updatedData = { ...updatedData, password: hashedPassword };
        }

        const updatedUser = await prisma.user.update({
            where: { id },
            data: updatedData,
        });

        return NextResponse.json({
            message: "Usuário atualizado com sucesso",
            user: updatedUser,
        });

    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: "Erro de validação", details: error.errors },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: "Erro ao atualizar usuário" },
            { status: 500 }
        );
    }
}
