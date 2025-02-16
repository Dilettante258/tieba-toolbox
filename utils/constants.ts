export const backendUrl = 'http://localhost:8000'

export function getData(url: string, params: {[k:string]: string}) {
  const searchParams = new URLSearchParams(params);
  const src = new URL(url+'?'+searchParams.toString(), backendUrl);
  console.log(src.toString());
  return fetch(src.toString()).then(res => res.json()).catch(console.error);
}
