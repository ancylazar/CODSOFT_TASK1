import { prisma } from "@/lib/prisma";
import PageHeader from "@/components/PageHeader";

export default async function FeesPage() {
  const fees = await prisma.fee.findMany({ include:{student:true}, orderBy:{dueDate:"asc"} });
  return <>
    <PageHeader title="Fees" description="Track tuition and other student payments." />
    <section className="panel"><div className="table-wrap"><table>
      <thead><tr><th>Student</th><th>Fee Type</th><th>Amount</th><th>Paid</th><th>Balance</th><th>Due Date</th><th>Status</th></tr></thead>
      <tbody>{fees.map(f=><tr key={f.id}><td>{f.student.firstName} {f.student.lastName}</td><td>{f.feeType}</td><td>₹{f.amount.toLocaleString()}</td><td>₹{f.paidAmount.toLocaleString()}</td><td>₹{(f.amount-f.paidAmount).toLocaleString()}</td><td>{f.dueDate.toLocaleDateString()}</td><td><span className={`badge ${f.status.toLowerCase()}`}>{f.status}</span></td></tr>)}</tbody>
    </table></div></section>
  </>;
}
