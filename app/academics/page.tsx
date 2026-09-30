import { prisma } from "@/lib/prisma";
import PageHeader from "@/components/PageHeader";

export default async function AcademicsPage() {
  const records = await prisma.academicRecord.findMany({ include:{student:true}, orderBy:{gpa:"desc"} });
  return <>
    <PageHeader title="Academic Records" description="Semester GPA, credits and academic remarks." />
    <section className="panel"><div className="table-wrap"><table>
      <thead><tr><th>Student</th><th>Admission No</th><th>Semester</th><th>GPA</th><th>Credits</th><th>Remarks</th></tr></thead>
      <tbody>{records.map(r=><tr key={r.id}><td>{r.student.firstName} {r.student.lastName}</td><td>{r.student.admissionNo}</td><td>{r.semester}</td><td><strong>{r.gpa.toFixed(1)}</strong></td><td>{r.credits}</td><td>{r.remarks||"—"}</td></tr>)}</tbody>
    </table></div></section>
  </>;
}
