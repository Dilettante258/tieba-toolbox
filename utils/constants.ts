export const backendUrl = 'http://localhost:8000'

export async function getData(url: string, params: {[k:string]: string}) {
  const searchParams = new URLSearchParams(params);
  const src = new URL(url+'?'+searchParams.toString(), backendUrl);
  return fetch(src.toString() ,{ next: { revalidate: 1 } }).then(res => res.json()).catch(console.error);
}
