import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const students = await prisma.student.findMany({ orderBy: { id: "desc" } });
  return NextResponse.json(students);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const student = await prisma.student.create({
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
    return NextResponse.json(student, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.code === "P2002" ? "Admission number or email already exists." : "Unable to create student." }, { status: 400 });
  }
}
