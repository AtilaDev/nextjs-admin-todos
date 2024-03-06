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
