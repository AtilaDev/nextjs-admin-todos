export const updateTodo = async (id: string, complete: boolean) => {
  const body = { complete };

  const response = await fetch(`/api/todos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());

  console.log({ response });

  return response;
};
