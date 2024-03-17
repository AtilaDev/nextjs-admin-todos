import prisma from '@/app/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';
import * as yup from 'yup';

function checkIfNumberAndRespond(value: number, fieldName: string) {
  if (isNaN(value)) {
    return NextResponse.json(
      {
        message: `${fieldName} must be a number`,
      },
      { status: 400 }
    );
  }
  return null;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const take = Number(searchParams.get('take') ?? '10');
  const skip = Number(searchParams.get('skip') ?? '0');

  const takeError = checkIfNumberAndRespond(take, 'take');
  if (takeError) {
    return takeError;
  }

  const skipError = checkIfNumberAndRespond(skip, 'skip');
  if (skipError) {
    return skipError;
  }

  const todos = await prisma.todo.findMany({ take, skip });

  return NextResponse.json(todos);
}

const postSchema = yup.object({
  description: yup.string().required(),
  complete: yup.boolean().optional().default(false),
});

export async function POST(req: Request) {
  try {
    const { description, complete } = await postSchema.validate(
      await req.json()
    );
    const todo = await prisma.todo.create({
      data: {
        description,
        complete,
      },
    });

    return NextResponse.json(todo);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  try {
    const todo = await prisma.todo.deleteMany({
      where: {
        complete: true,
      },
    });
    return NextResponse.json(todo);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
