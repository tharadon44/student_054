import AdmissionForm from './components/AdmissionForm';
import { getStudents, deleteStudent } from './actions/studentActions';

export default async function HomePage() {
  const students = await getStudents();

  return (
    <main className="max-w-4xl mx-auto p-8">
      {/* Title */}
      <h1 className="text-3xl font-extrabold text-center mb-8 text-blue-700">
        🎓 ระบบรับสมัครนักเรียน
      </h1>

      {/* Admission Form */}
      <div className="mb-10 bg-white p-6 rounded-2xl shadow-md border">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          📝 แบบฟอร์มสมัครเรียน
        </h2>
        <AdmissionForm />
      </div>

      {/* Students List */}
      <div className="bg-white p-6 rounded-2xl shadow-md border">
        <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center gap-2">
          📋 รายชื่อนักเรียน
          <span className="text-sm text-gray-500">({students.length} คน)</span>
        </h2>

        {students.length === 0 ? (
          <p className="text-gray-500 text-center py-4">ยังไม่มีข้อมูลนักเรียน</p>
        ) : (
          <ul className="space-y-4">
            {students.map((student) => (
              <li
                key={student.id}
                className="p-4 border rounded-xl shadow-sm hover:shadow-md transition bg-gray-50 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold text-lg">
                    {student.firstName} {student.lastName}
                  </p>
                  <p className="text-sm text-gray-600">
                    {student.major} - {student.faculty}
                  </p>
                  <p className="text-sm text-gray-500">
                    {student.email} | {student.phone}
                  </p>
                </div>
                <form
                  action={async () => {
                    "use server";
                    await deleteStudent(student.id);
                  }}
                >
                  <button className="px-3 py-1.5 rounded-lg text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition">
                    ลบ
                  </button>
                </form>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
