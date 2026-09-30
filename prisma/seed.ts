import { PrismaClient, AttendanceStatus, PaymentStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.examResult.deleteMany();
  await prisma.attendance.deleteMany();
  await prisma.fee.deleteMany();
  await prisma.academicRecord.deleteMany();
  await prisma.exam.deleteMany();
  await prisma.student.deleteMany();
  await prisma.teacher.deleteMany();

  const students = await Promise.all([
    prisma.student.create({
      data: {
        admissionNo: "CS2026001",
        firstName: "Ancy",
        lastName: "Lazar",
        email: "ancy@example.com",
        phone: "9876543210",
        department: "Computer Science",
        year: 3,
        gender: "Female",
        address: "Tamil Nadu",
        guardianName: "Lazar",
        guardianPhone: "9876500000"
      }
    }),
    prisma.student.create({
      data: {
        admissionNo: "CS2026002",
        firstName: "Rahul",
        lastName: "Kumar",
        email: "rahul@example.com",
        phone: "9876543211",
        department: "Computer Science",
        year: 2,
        gender: "Male",
        address: "Chennai",
        guardianName: "Kumar",
        guardianPhone: "9876500001"
      }
    }),
    prisma.student.create({
      data: {
        admissionNo: "IT2026003",
        firstName: "Priya",
        lastName: "Sharma",
        email: "priya@example.com",
        phone: "9876543212",
        department: "Information Technology",
        year: 1,
        gender: "Female",
        address: "Vellore",
        guardianName: "Sharma",
        guardianPhone: "9876500002"
      }
    })
  ]);

  await prisma.teacher.createMany({
    data: [
      { employeeNo: "EMP001", name: "Dr. Visalakshi", email: "visalakshi@example.com", phone: "9000000001", department: "Computer Science", designation: "Professor" },
      { employeeNo: "EMP002", name: "Arun Kumar", email: "arun@example.com", phone: "9000000002", department: "Information Technology", designation: "Assistant Professor" },
      { employeeNo: "EMP003", name: "Meena Joseph", email: "meena@example.com", phone: "9000000003", department: "Computer Science", designation: "Lecturer" }
    ]
  });

  const exam = await prisma.exam.create({
    data: {
      name: "CAT 1",
      semester: "Semester 5",
      startDate: new Date("2026-08-10"),
      endDate: new Date("2026-08-15")
    }
  });

  await prisma.examResult.createMany({
    data: [
      { studentId: students[0].id, examId: exam.id, subject: "Web Development", marks: 88, grade: "A" },
      { studentId: students[0].id, examId: exam.id, subject: "Artificial Intelligence", marks: 91, grade: "A+" },
      { studentId: students[1].id, examId: exam.id, subject: "Web Development", marks: 76, grade: "B+" }
    ]
  });

  await prisma.attendance.createMany({
    data: [
      { studentId: students[0].id, subject: "Web Development", status: AttendanceStatus.PRESENT, date: new Date() },
      { studentId: students[1].id, subject: "Web Development", status: AttendanceStatus.LATE, date: new Date() },
      { studentId: students[2].id, subject: "Web Development", status: AttendanceStatus.ABSENT, date: new Date() }
    ]
  });

  await prisma.fee.createMany({
    data: [
      { studentId: students[0].id, feeType: "Tuition Fee", amount: 60000, paidAmount: 60000, dueDate: new Date("2026-08-30"), status: PaymentStatus.PAID },
      { studentId: students[1].id, feeType: "Tuition Fee", amount: 60000, paidAmount: 30000, dueDate: new Date("2026-08-30"), status: PaymentStatus.PARTIAL },
      { studentId: students[2].id, feeType: "Tuition Fee", amount: 60000, paidAmount: 0, dueDate: new Date("2026-08-30"), status: PaymentStatus.PENDING }
    ]
  });

  await prisma.academicRecord.createMany({
    data: [
      { studentId: students[0].id, semester: "Semester 5", gpa: 8.7, credits: 24, remarks: "Good performance" },
      { studentId: students[1].id, semester: "Semester 3", gpa: 7.8, credits: 22, remarks: "Consistent" },
      { studentId: students[2].id, semester: "Semester 1", gpa: 8.2, credits: 20, remarks: "Good start" }
    ]
  });

  console.log("Seed completed successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
