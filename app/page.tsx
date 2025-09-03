import { getStudents } from './actions/studentActions';
import Link from 'next/link';
import DeleteStudentButton from './components/DeleteStudentButton';

export default async function Home() {
  const result = await getStudents();

  if (!result.success) {
    return (
      <div className="p-4 text-red-600">
        ⚠️ เกิดข้อผิดพลาด: {result.message}
      </div>
    );
  }

  const students = result.data;

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center 
      min-h-screen p-8 pb-20 gap-16 sm:p-20 
      bg-gradient-to-r from-green-100 via-teal-100 to-cyan-200">
      
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start 
        w-full max-w-6xl bg-white shadow-2xl rounded-2xl p-8 border border-gray-100">
        
        {/* Header */}
        <div className="flex justify-between w-full items-center border-b pb-4">
          <h2 className="text-3xl font-bold text-gray-800">📋 รายชื่อนักเรียน</h2>
          <Link
            href="/add_students"
            className="inline-block rounded-lg bg-gradient-to-r from-green-400 to-teal-500 
              text-white px-5 py-2 font-semibold hover:scale-105 hover:shadow-lg 
              transition duration-300"
          >
            ➕ เพิ่มนักเรียน
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-auto w-full mt-6">
          <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <thead className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-sm uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3 text-center">ID</th>
                <th className="px-4 py-3">ชื่อ</th>
                <th className="px-4 py-3">คณะ</th>
                <th className="px-4 py-3">สาขา</th>
                <th className="px-4 py-3">อีเมล</th>
                <th className="px-4 py-3">เบอร์โทร</th>
                <th className="px-4 py-3">สร้างเมื่อ</th>
                <th className="px-4 py-3">อัปเดตล่าสุด</th>
                <th className="px-4 py-3 text-center">แก้ไข</th>
                <th className="px-4 py-3 text-center">ลบ</th>
              </tr>
            </thead>
            <tbody className="text-gray-800 text-sm divide-y divide-gray-100">
              {students.length > 0 ? (
                students.map((student, index) => (
                  <tr
                    key={student.id}
                    className={`hover:bg-cyan-50 transition duration-200 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }`}
                  >
                    <td className="px-4 py-3 text-center font-medium">{student.id}</td>
                    <td className="px-4 py-3">{student.firstName} {student.lastName}</td>
                    <td className="px-4 py-3">{student.major}</td>
                    <td className="px-4 py-3">{student.faculty}</td>
                    <td className="px-4 py-3">{student.email}</td>
                    <td className="px-4 py-3">{student.phone}</td>
                    <td className="px-4 py-3">{new Date(student.createdAt).toLocaleString()}</td>
                    <td className="px-4 py-3">{new Date(student.updatedAt).toLocaleString()}</td>
                    <td className="px-4 py-3 text-center">
                      <Link
                        href={`/edit_student/${student.id}`}
                        className="inline-block px-3 py-1 text-sm font-medium rounded-md 
                          text-blue-600 bg-blue-50 hover:bg-blue-100 hover:scale-105 transition"
                      >
                        ✏️ แก้ไข
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <DeleteStudentButton studentId={student.id} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} className="text-center px-4 py-6 text-gray-500">
                    ไม่มีข้อมูลนักเรียน
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
