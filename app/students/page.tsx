import StudentsClient from "./StudentsClient";
import { prisma } from "@/lib/prisma";

export default async function StudentsPage() {
  const students = await prisma.student.findMany({ orderBy: { id: "desc" } });
  return <StudentsClient initialStudents={students.map(s => ({ ...s, dateOfBirth: s.dateOfBirth?.toISOString() ?? null, createdAt: s.createdAt.toISOString(), updatedAt: s.updatedAt.toISOString() }))} />;
}
