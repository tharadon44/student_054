'use server';

import { prisma } from '@/lib/prisma';
import { Student } from '@prisma/client';

export type ActionState = {
  success: boolean;
  message: string;
};

// CREATE
export async function createStudent(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    await prisma.student.create({
      data: {
        firstName: formData.get('firstName') as string,
        lastName: formData.get('lastName') as string,
        major: formData.get('major') as string,
        faculty: formData.get('faculty') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
      },
    });
    return { success: true, message: 'เพิ่มข้อมูลนักเรียนสำเร็จ' };
  } catch (error: any) {
    return { success: false, message: 'เกิดข้อผิดพลาด: ' + error.message };
  }
}

// ✅ READ (อย่าลืม export ตรงนี้)
export async function getStudents(): Promise<Student[]> {
  return prisma.student.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

// UPDATE
export async function updateStudent(
  id: number,
  formData: FormData
): Promise<ActionState> {
  try {
    await prisma.student.update({
      where: { id },
      data: {
        firstName: formData.get('firstName') as string,
        lastName: formData.get('lastName') as string,
        major: formData.get('major') as string,
        faculty: formData.get('faculty') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
      },
    });
    return { success: true, message: 'แก้ไขข้อมูลสำเร็จ' };
  } catch (error: any) {
    return { success: false, message: 'เกิดข้อผิดพลาด: ' + error.message };
  }
}

// DELETE
export async function deleteStudent(id: number): Promise<ActionState> {
  try {
    await prisma.student.delete({ where: { id } });
    return { success: true, message: 'ลบข้อมูลสำเร็จ' };
  } catch (error: any) {
    return { success: false, message: 'เกิดข้อผิดพลาด: ' + error.message };
  }
}
