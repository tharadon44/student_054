'use client';

import { useFormState } from 'react-dom';
import { createStudent } from '../actions/studentActions';
import SubmitButton from './SubmitButton';

const initialState = { message: null, success: false };

export default function AdmissionForm() {
  const [state, formAction] = useFormState(createStudent, initialState);

  return (
    <form action={formAction} className="space-y-3 p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-bold">📌 ฟอร์มสมัครนักเรียน</h2>

      <input name="firstName" placeholder="ชื่อ" className="border p-2 w-full" required />
      <input name="lastName" placeholder="นามสกุล" className="border p-2 w-full" required />
      <input name="major" placeholder="สาขา" className="border p-2 w-full" required />
      <input name="faculty" placeholder="คณะ" className="border p-2 w-full" required />
      <input name="email" type="email" placeholder="อีเมล" className="border p-2 w-full" required />
      <input name="phone" placeholder="เบอร์โทร" className="border p-2 w-full" required />

      <SubmitButton />

      {state.message && (
        <p className={state.success ? 'text-green-600' : 'text-red-600'}>
          {state.message}
        </p>
      )}
    </form>
  );
}