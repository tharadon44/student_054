import Link from 'next/link';
import EditStudentForm from '../../components/EditStudentForm';
import { getStudentById } from '../../actions/studentActions';

interface Props {
  params: { id: string };
}

export default async function EditStudentPage({ params }: Props) {
  // ป้องกัน NaN
  const studentId = Number(params.id);
  if (Number.isNaN(studentId)) {
    return (
      <ErrorState title="ไม่พบข้อมูลนักเรียน" message="รหัสนักเรียนไม่ถูกต้อง" />
    );
  }

  const result = await getStudentById(studentId);

  if (!result.success || !result.data) {
    return (
      <ErrorState
        title="ไม่พบข้อมูลนักเรียน"
        message="กรุณาตรวจสอบลิงก์หรือลองใหม่อีกครั้ง"
      />
    );
  }

  const student = result.data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-teal-100 to-cyan-200 p-6 flex items-center justify-center">
      <div className="w-full max-w-3xl">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
          {/* Header bar */}
          <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-teal-500 to-cyan-500">
            <div className="flex items-center gap-3">
              <span className="text-white text-2xl">🛠️</span>
              <h1 className="text-white text-xl sm:text-2xl font-bold">
                แก้ไขข้อมูลนักเรียน
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 text-white backdrop-blur
                           hover:bg-white/20 transition"
              >
                ⬅️ กลับหน้าแรก
              </Link>
              <Link
                href="/add_students"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-1.5 text-teal-700 font-medium
                           hover:shadow-md transition"
              >
                ➕ เพิ่มนักเรียน
              </Link>
            </div>
          </div>

          {/* Info strip */}
          <div className="px-6 py-3 bg-gray-50 text-sm text-gray-600 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-teal-500" />
              <span>กำลังแก้ไข: <strong className="text-gray-800">ID {student.id}</strong></span>
            </span>
            <span className="hidden sm:inline text-gray-300">|</span>
            <span>อัปเดตล่าสุด: {new Date(student.updatedAt).toLocaleString()}</span>
          </div>

          {/* Form body */}
          <div className="p-6">
            <EditStudentForm student={student} />
          </div>
        </div>
      </div>
    </div>
  );
}

/** ------- Components ------- */
function ErrorState({ title, message }: { title: string; message?: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-teal-100 to-cyan-200 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-100 text-center max-w-md w-full">
        <h1 className="text-2xl font-semibold text-teal-700 mb-2">{title}</h1>
        {message && <p className="text-gray-600 mb-6">{message}</p>}
        <div className="flex items-center justify-center gap-3">
          <Link
            href="/"
            className="rounded-lg bg-teal-600 text-white px-4 py-2 font-medium hover:bg-teal-700 transition"
          >
            กลับหน้าแรก
          </Link>
          <Link
            href="/add_students"
            className="rounded-lg bg-white text-teal-700 px-4 py-2 font-medium border border-teal-200 hover:shadow-sm transition"
          >
            เพิ่มนักเรียนใหม่
          </Link>
        </div>
      </div>
    </div>
  );
}
