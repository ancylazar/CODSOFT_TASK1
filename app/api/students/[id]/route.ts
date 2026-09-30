import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const body = await req.json();
    const student = await prisma.student.update({
      where: { id: Number(id) },
      data: {
        admissionNo: body.admissionNo,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone || null,
        department: body.department,
        year: Number(body.year),
        gender: body.gender || null,
        address: body.address || null,
        guardianName: body.guardianName || null,
        guardianPhone: body.guardianPhone || null
      }
    });
    return NextResponse.json(student);
  } catch (error: any) {
    return NextResponse.json({ error: error?.code === "P2002" ? "Admission number or email already exists." : "Unable to update student." }, { status: 400 });
  }
}

export async function DELETE(_: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    await prisma.student.delete({ where: { id: Number(id) } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Unable to delete student." }, { status: 400 });
  }
}
