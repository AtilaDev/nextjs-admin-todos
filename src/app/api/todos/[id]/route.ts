import prisma from '@/app/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';
import * as yup from 'yup';

interface Segments {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: Segments) {
  const { id } = params;

  const todo = await prisma.todo.findFirst({
    where: { id },
  });

  if (!todo) {
    return NextResponse.json(
      {
        message: `Todo ${id} not found`,
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json(todo);
}

const putSchema = yup.object({
  description: yup.string().optional(),
  complete: yup.boolean().optional(),
});

export async function PUT(req: Request, { params }: Segments) {
  try {
    const { id } = params;
    const { description, complete } = await putSchema.validate(
      await req.json()
    );

    const updateTodo = await prisma.todo.update({
      where: { id },
      data: {
        description,
        complete,
      },
    });

    return NextResponse.json(updateTodo);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
