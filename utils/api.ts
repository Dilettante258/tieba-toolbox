
type ErrorMsg = {
  error: string;
  stack: string;
}

export function isErrorMsg(data: unknown): data is ErrorMsg {
  return typeof data === 'object' && data !== null && 'error' in data && 'stack' in data;
}

/**
 * 发送 GET 请求
 * @param url 请求的 URL
 * @param params 查询参数对象
 * @returns 返回解析后的 JSON 数据
 */
export async function GET<T>(url: string, params?: ConstructorParameters<typeof URLSearchParams>[number]): Promise<T | ErrorMsg> {
  return fetch(url, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      },
      ...(params && { search: new URLSearchParams(params).toString() })
  })
  .then(response => {
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json() as Promise<T>;
  })
  .catch(error => {
      throw new Error(`Fetch error: ${error.message}`);
  });
}
