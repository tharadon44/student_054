'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createStudent } from '../actions/studentActions';
import Link from 'next/link';

const iconMap: Record<string, string> = {
  firstName: '👤',
  lastName: '🧑‍🦱',
  major: '🎓',
  faculty: '🏫',
  email: '📧',
  phone: '📞',
};


export default function AdmissionForm() {
  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const result = await createStudent(formData);

    setMessage(result.message);
    setSuccess(result.success);

    if (result.success) {
      setTimeout(() => {
        router.push('/');
      }, 1500);
    }
  }

  const formFields = [
    {
      label: 'ชื่อ',
      name: 'firstName',
      placeholder: 'ชื่อจริง',
      type: 'text',
    },
    {
      label: 'นามสกุล',
      name: 'lastName',
      placeholder: 'นามสกุล',
      type: 'text',
    },
    {
      label: 'คณะ',
      name: 'faculty',
      placeholder: 'เช่น คณะวิทยาศาสตร์',
      type: 'text',
    },
    {
      label: 'สาขา',
      name: 'major',
      placeholder: 'เช่น วิทยาการคอมพิวเตอร์',
      type: 'text',
    },
    {
      label: 'อีเมล',
      name: 'email',
      placeholder: 'example@email.com',
      type: 'email',
    },
    {
      label: 'เบอร์โทรศัพท์',
      name: 'phone',
      placeholder: '08xxxxxxxx',
      type: 'tel',
    },
  ];

return (
  <div className="bg-gradient-to-br from-green-50 via-green-100 to-green-200 flex items-center justify-center p-6 min-h-[80vh]">
    <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-2xl border border-green-200 hover:shadow-green-300 transition-shadow duration-300 ease-in-out">
      {/* Header and Close Button */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-green-700 tracking-tight select-none drop-shadow-sm">
          แบบฟอร์มเพิ่มนักเรียน
        </h1>
        <Link
          href="/"
          className="text-green-500 hover:text-green-700 transition-colors text-5xl font-extrabold leading-none"
          aria-label="Close form"
        >
          &times;
        </Link>
      </div>
      <p className="text-green-600 mb-10 text-lg font-medium select-none">
        กรุณากรอกข้อมูลนักเรียนให้ครบถ้วน
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {formFields.map(({ label, name, placeholder, type }) => (
            <div key={name} className="relative">
              <label
                htmlFor={name}
                className="flex items-center gap-2 text-green-700 font-semibold mb-3 select-none"
              >
                <span className="text-xl">{iconMap[name]}</span> {label}:
              </label>
              <input
                type={type}
                name={name}
                id={name}
                required
                placeholder={placeholder}
                className="w-full px-5 py-4 border border-green-200 rounded-3xl shadow-sm placeholder-green-400 text-green-900 font-medium
                  focus:outline-none focus:ring-4 focus:ring-green-300 focus:border-green-400 transition duration-300 ease-in-out
                  hover:border-green-300 hover:shadow-green-100"
              />
            </div>
          ))}
        </div>

        {/* Submit Button and Message */}
        <div className="flex flex-col items-center justify-between pt-6">
          <button
            type="submit"
            className="w-full md:w-auto px-12 py-4 bg-green-600 text-white font-bold rounded-3xl shadow-lg
              hover:bg-green-700 hover:shadow-green-600 transition transform hover:scale-110 focus:outline-none focus:ring-6 focus:ring-green-500 focus:ring-offset-2"
          >
            ส่งข้อมูล
          </button>
          {message && (
            <div
              className={`mt-8 px-6 py-3 rounded-3xl text-center font-semibold w-full max-w-md select-text
              ${
                success
                  ? 'bg-green-100 text-green-800 border border-green-300'
                  : 'bg-red-100 text-red-800 border border-red-300'
              }`}
            >
              {message}
            </div>
          )}
        </div>
      </form>
    </div>
  </div>
);

}