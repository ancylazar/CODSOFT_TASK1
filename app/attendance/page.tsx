import { prisma } from "@/lib/prisma";
import PageHeader from "@/components/PageHeader";

export default async function AttendancePage() {
  const records = await prisma.attendance.findMany({ include:{student:true}, orderBy:{date:"desc"} });
  return <>
    <PageHeader title="Attendance" description="Monitor daily student attendance." />
    <section className="panel"><div className="table-wrap"><table>
      <thead><tr><th>Date</th><th>Student</th><th>Admission No</th><th>Subject</th><th>Status</th></tr></thead>
      <tbody>{records.map(r=><tr key={r.id}><td>{r.date.toLocaleDateString()}</td><td>{r.student.firstName} {r.student.lastName}</td><td>{r.student.admissionNo}</td><td>{r.subject}</td><td><span className={`badge ${r.status.toLowerCase()}`}>{r.status}</span></td></tr>)}</tbody>
    </table></div></section>
  </>;
}
