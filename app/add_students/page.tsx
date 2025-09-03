// app/add-student/page.tsx
import Link from 'next/link';
import AdmissionForm from '../components/AdmissionForm';

export default function AddStudentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-teal-100 to-cyan-200 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
          {/* Header bar */}
          <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-teal-500 to-cyan-500">
            <div className="flex items-center gap-3">
              <span className="text-white text-2xl">📝</span>
              <h1 className="text-white text-xl sm:text-2xl font-bold tracking-tight">
                เพิ่มข้อมูลนักเรียน
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
            </div>
          </div>

          {/* Subhead / helper */}
          <div className="px-6 py-3 bg-gray-50 text-sm text-gray-600">
            กรุณากรอกข้อมูลให้ครบถ้วน ระบบจะตรวจสอบความถูกต้องของอีเมลและเบอร์โทรอัตโนมัติ
          </div>

          {/* Body */}
          <div className="p-6">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-teal-50 text-teal-700 border border-teal-100 px-3 py-1 text-xs">
                <span className="h-2 w-2 rounded-full bg-teal-500" />
                แบบฟอร์มปลอดภัย ข้อมูลจะถูกเก็บอย่างเป็นความลับ
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-100 px-3 py-1 text-xs">
                ⏱️ ใช้เวลาเพียง 1–2 นาที
              </span>
            </div>

            {/* Form */}
            <div className="rounded-xl border border-gray-100 p-4 sm:p-5 hover:shadow-md transition">
              <AdmissionForm />
            </div>

            {/* Footer hint */}
            <div className="mt-4 text-xs text-gray-500">
              หลังบันทึกข้อมูล ระบบจะอัปเดตรายการโดยอัตโนมัติ
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
