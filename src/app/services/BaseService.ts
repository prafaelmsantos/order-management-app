interface IErrorResponse {
  message?: string;
}

export async function getErrorMessage(response: Response): Promise<string> {
  try {
    return (
      (await (response.json() as Promise<IErrorResponse>)).message ||
      response.statusText ||
      'error'
    );
  } catch {
    return response.statusText || 'error';
  }
}

export const getSessionHeaders = (contentType = 'application/json') => {
  return {
    'Content-type': contentType
  };
};

export async function getData<T>(endpoint: string): Promise<T> {
  const response = await fetch(endpoint, {
    method: 'GET',
    headers: getSessionHeaders()
  });
  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }
  return (await response.json()) as Promise<T>;
}

export async function putData<T>(endpoint: string, body: T): Promise<T> {
  const response = await fetch(endpoint, {
    method: 'PUT',
    headers: getSessionHeaders(),
    body: JSON.stringify(body)
  });
  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }
  return (await response.json()) as Promise<T>;
}

export async function postData<T>(endpoint: string, body: T): Promise<T> {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: getSessionHeaders(),
    body: JSON.stringify(body)
  });
  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }
  return (await response.json()) as Promise<T>;
}

export async function deleteData<T>(endpoint: string): Promise<T> {
  const response = await fetch(endpoint, {
    method: 'DELETE',
    headers: getSessionHeaders()
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return (await response.json()) as Promise<T>;
}
