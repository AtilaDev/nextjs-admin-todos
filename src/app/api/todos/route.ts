import prisma from '@/app/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';

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

export async function POST(req: Request) {
  const body = await req.json();

  if (!body) {
    return NextResponse.json(
      {
        message: 'Invalid request body. The "description" property is missing.',
      },
      { status: 400 }
    );
  }

  const todo = await prisma.todo.create({
    data: body,
  });

  return NextResponse.json(todo);
}
