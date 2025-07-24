import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    console.log("DELETE /agenda body", body);
    const { id } = body;
    if (!id) {
      return NextResponse.json({ error: "ID é obrigatório" }, { status: 400 });
    }

    const appointment = await prisma.agenda.findUnique({ where: { id } });
    if (!appointment) {
      return NextResponse.json({ error: "Agendamento não encontrado" }, { status: 404 });
    }

    await prisma.agenda.delete({ where: { id } });

    console.log("DELETE /agenda response", { sucess: "Agendamento excluído" });
    return NextResponse.json({ sucess: `Agendamento excluído` });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
