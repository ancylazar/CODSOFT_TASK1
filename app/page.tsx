import { prisma } from "@/lib/prisma";
import StatCard from "@/components/StatCard";
import PageHeader from "@/components/PageHeader";

export default async function Dashboard() {
  const [students, teachers, attendance, pendingFees, exams] = await Promise.all([
    prisma.student.count(),
    prisma.teacher.count(),
    prisma.attendance.count({ where: { status: "PRESENT" } }),
    prisma.fee.count({ where: { status: { not: "PAID" } } }),
    prisma.exam.count()
  ]);

  const recentStudents = await prisma.student.findMany({
    orderBy: { createdAt: "desc" },
    take: 5
  });

  return (
    <>
      <PageHeader title="Dashboard" description="Centralized academic and administrative overview." />
      <div className="stats-grid">
        <StatCard label="Students" value={students} hint="Registered students" />
        <StatCard label="Teachers" value={teachers} hint="Teaching staff" />
        <StatCard label="Present Attendance" value={attendance} hint="Attendance records" />
        <StatCard label="Pending Fees" value={pendingFees} hint="Need attention" />
        <StatCard label="Examinations" value={exams} hint="Scheduled exams" />
      </div>

      <section className="panel">
        <div className="panel-title">
          <div><h2>Recent Students</h2><p>Latest student records in the system.</p></div>
          <a className="button secondary" href="/students">View all</a>
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Admission No</th><th>Name</th><th>Department</th><th>Year</th><th>Email</th></tr></thead>
            <tbody>
              {recentStudents.map(s => (
                <tr key={s.id}>
                  <td><strong>{s.admissionNo}</strong></td>
                  <td>{s.firstName} {s.lastName}</td>
                  <td>{s.department}</td>
                  <td>{s.year}</td>
                  <td>{s.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
