'use server';

import prisma from '@/app/lib/prisma';
import { Todo } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import * as actions from '@/auth/actions/auth-actions';

export const sleep = async (seconds: number = 0) => {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
};

export const toggleTodo = async (
  id: string,
  complete: boolean
): Promise<Todo> => {
  await sleep(3);

  const todo = await prisma.todo.findFirst({ where: { id } });

  if (!todo) {
    throw `Todo con ${id} no existe`;
  }

  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { complete },
  });

  revalidatePath('/dashboard/server-todos');
  return updatedTodo;
};

export const addTodo = async (description: string): Promise<Todo | {}> => {
  const user = await actions.getUserServerSession();

  try {
    const todo = await prisma.todo.create({
      data: {
        description,
        userId: user?.id,
      },
    });

    revalidatePath('/dashboard/server-todos');
    return todo;
  } catch (error) {
    return {
      message: 'Error al crear el Todo',
    };
  }
};

export const deleteCompleted = async (): Promise<void> => {
  try {
    await prisma.todo.deleteMany({
      where: {
        complete: true,
      },
    });
    revalidatePath('/dashboard/server-todos');
  } catch (error) {}
};
