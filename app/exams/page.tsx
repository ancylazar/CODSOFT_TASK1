import { prisma } from "@/lib/prisma";
import PageHeader from "@/components/PageHeader";

export default async function ExamsPage() {
  const exams = await prisma.exam.findMany({ include:{results:{include:{student:true}}}, orderBy:{startDate:"desc"} });
  return <>
    <PageHeader title="Examinations" description="Exams, subjects, marks and grades." />
    {exams.map(ex=><section className="panel" key={ex.id}>
      <div className="panel-title"><div><h2>{ex.name}</h2><p>{ex.semester} · {ex.startDate.toLocaleDateString()} – {ex.endDate.toLocaleDateString()}</p></div></div>
      <div className="table-wrap"><table><thead><tr><th>Student</th><th>Subject</th><th>Marks</th><th>Grade</th></tr></thead>
      <tbody>{ex.results.map(r=><tr key={r.id}><td>{r.student.firstName} {r.student.lastName}</td><td>{r.subject}</td><td>{r.marks}</td><td><span className="badge">{r.grade}</span></td></tr>)}</tbody></table></div>
    </section>)}
  </>;
}
