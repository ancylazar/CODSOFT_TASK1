"use client";

import { useMemo, useState } from "react";
import PageHeader from "@/components/PageHeader";

type Student = {
  id: number; admissionNo: string; firstName: string; lastName: string; email: string;
  phone: string | null; department: string; year: number; gender: string | null;
  address: string | null; guardianName: string | null; guardianPhone: string | null;
  dateOfBirth: string | null; createdAt: string; updatedAt: string;
};

const empty = { admissionNo:"", firstName:"", lastName:"", email:"", phone:"", department:"Computer Science", year:1, gender:"", address:"", guardianName:"", guardianPhone:"" };

export default function StudentsClient({ initialStudents }: { initialStudents: Student[] }) {
  const [students, setStudents] = useState(initialStudents);
  const [form, setForm] = useState<any>(empty);
  const [editing, setEditing] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const filtered = useMemo(() => students.filter(s => `${s.firstName} ${s.lastName} ${s.admissionNo} ${s.email}`.toLowerCase().includes(search.toLowerCase())), [students, search]);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    const method = editing ? "PUT" : "POST";
    const url = editing ? `/api/students/${editing}` : "/api/students";
    const res = await fetch(url, { method, headers: {"Content-Type":"application/json"}, body: JSON.stringify(form) });
    const data = await res.json();
    if (!res.ok) return alert(data.error || "Something went wrong");
    if (editing) setStudents(students.map(s => s.id === editing ? data : s));
    else setStudents([data, ...students]);
    setForm(empty); setEditing(null); setOpen(false);
  }

  function edit(s: Student) {
    setForm({ admissionNo:s.admissionNo, firstName:s.firstName, lastName:s.lastName, email:s.email, phone:s.phone||"", department:s.department, year:s.year, gender:s.gender||"", address:s.address||"", guardianName:s.guardianName||"", guardianPhone:s.guardianPhone||"" });
    setEditing(s.id); setOpen(true);
  }

  async function remove(id:number) {
    if (!confirm("Delete this student?")) return;
    const res = await fetch(`/api/students/${id}`, {method:"DELETE"});
    if (res.ok) setStudents(students.filter(s => s.id !== id));
    else alert("Unable to delete student.");
  }

  return (
    <>
      <PageHeader title="Students" description="Add, edit, search and manage student records."
        action={<button className="button primary" onClick={()=>{setForm(empty);setEditing(null);setOpen(true)}}>+ Add Student</button>} />
      <div className="toolbar"><input className="search" placeholder="Search by name, admission no or email..." value={search} onChange={e=>setSearch(e.target.value)} /><span>{filtered.length} records</span></div>
      <section className="panel">
        <div className="table-wrap"><table>
          <thead><tr><th>Admission No</th><th>Student</th><th>Department</th><th>Year</th><th>Contact</th><th>Actions</th></tr></thead>
          <tbody>{filtered.map(s=><tr key={s.id}>
            <td><strong>{s.admissionNo}</strong></td><td>{s.firstName} {s.lastName}<small className="muted">{s.email}</small></td>
            <td>{s.department}</td><td>{s.year}</td><td>{s.phone || "—"}</td>
            <td><div className="actions"><button className="button small secondary" onClick={()=>edit(s)}>Edit</button><button className="button small danger" onClick={()=>remove(s.id)}>Delete</button></div></td>
          </tr>)}</tbody>
        </table></div>
      </section>

      {open && <div className="modal-backdrop"><div className="modal">
        <div className="modal-head"><h2>{editing ? "Edit Student" : "Add Student"}</h2><button className="icon-button" onClick={()=>setOpen(false)}>×</button></div>
        <form onSubmit={save} className="form-grid">
          {[
            ["admissionNo","Admission No","text"],["firstName","First Name","text"],["lastName","Last Name","text"],["email","Email","email"],["phone","Phone","text"],
            ["department","Department","text"],["year","Year","number"],["gender","Gender","text"],["guardianName","Guardian Name","text"],["guardianPhone","Guardian Phone","text"]
          ].map(([key,label,type])=><label key={key}>{label}<input required={["admissionNo","firstName","lastName","email","department","year"].includes(key as string)} type={type} value={form[key as keyof typeof form]} onChange={e=>setForm({...form,[key]:type==="number"?Number(e.target.value):e.target.value})}/></label>)}
          <label className="full">Address<textarea value={form.address} onChange={e=>setForm({...form,address:e.target.value})}/></label>
          <div className="form-actions"><button type="button" className="button secondary" onClick={()=>setOpen(false)}>Cancel</button><button className="button primary">{editing?"Update":"Save Student"}</button></div>
        </form>
      </div></div>}
    </>
  );
}
