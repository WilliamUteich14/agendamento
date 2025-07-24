import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(_request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    if (!id) return NextResponse.json({ error: "ID inválido" }, { status: 400 });

    console.log("PATCH /agenda/:id/complete", id);
    const updated = await prisma.agenda.update({
      where: { id },
      data: { completed: true },
    });

    console.log("PATCH /agenda/:id/complete response", updated);
    return NextResponse.json(updated);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
