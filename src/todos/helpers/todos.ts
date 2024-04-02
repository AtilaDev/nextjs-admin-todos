export const updateTodo = async (id: string, complete: boolean) => {
  const body = { complete };

  const response = await fetch(`/api/todos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());

  // console.log({ response });

  return response;
};

export const createTodo = async (description: string) => {
  const body = { description };

  const response = await fetch('/api/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());

  // console.log({ response });

  return response;
};

export const deleteTodos = async (): Promise<boolean> => {
  await fetch('/api/todos', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());

  return true;
};
