"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  ["Dashboard", "/"],
  ["Students", "/students"],
  ["Teachers", "/teachers"],
  ["Attendance", "/attendance"],
  ["Examinations", "/exams"],
  ["Fees", "/fees"],
  ["Academic Records", "/academics"]
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">E</div>
        <div><strong>EduManage</strong><span>Student Management</span></div>
      </div>
      <nav>
        {links.map(([label, href]) => (
          <Link key={href} href={href} className={pathname === href ? "nav-link active" : "nav-link"}>
            <span>{label}</span>
          </Link>
        ))}
      </nav>
      <div className="sidebar-footer">
        <small>CodSoft Internship</small>
        <span>Task 1 · Full Stack Web Development</span>
      </div>
    </aside>
  );
}
