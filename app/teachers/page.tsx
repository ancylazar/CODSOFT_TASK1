import { prisma } from "@/lib/prisma";
import PageHeader from "@/components/PageHeader";

export default async function TeachersPage() {
  const teachers = await prisma.teacher.findMany({ orderBy: { id: "desc" } });
  return <>
    <PageHeader title="Teachers" description="Teaching staff and department information." />
    <section className="panel"><div className="table-wrap"><table>
      <thead><tr><th>Employee No</th><th>Name</th><th>Email</th><th>Department</th><th>Designation</th><th>Phone</th></tr></thead>
      <tbody>{teachers.map(t=><tr key={t.id}><td><strong>{t.employeeNo}</strong></td><td>{t.name}</td><td>{t.email}</td><td>{t.department}</td><td>{t.designation}</td><td>{t.phone||"—"}</td></tr>)}</tbody>
    </table></div></section>
  </>;
}
