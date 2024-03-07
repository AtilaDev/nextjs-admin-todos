import prisma from '@/app/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';

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
