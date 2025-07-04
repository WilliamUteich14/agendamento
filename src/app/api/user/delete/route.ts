import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const DeleteUserSchema = z.object({
  id: z.string().min(1, "ID é obrigatório"),
});

export async function DELETE(request: Request) {
  try {
    const body = await request.json();

    const { id } = DeleteUserSchema.parse(body);

    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return NextResponse.json(
        { message: "Usuário não existe." },
        { status: 400 }
      );
    }

    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Usuário deletado com sucesso." },
      { status: 200 }
    );

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Erro de validação", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Erro ao deletar usuário:", error);

    return NextResponse.json(
      { error: "Erro ao deletar usuário." },
      { status: 500 }
    );
  }
}
