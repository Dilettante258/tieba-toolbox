export const backendUrl = 'https://tb.wang1m.tech/'

export async function getData(url: string, params: {[k:string]: string}) {
  const searchParams = new URLSearchParams(params);
  const src = new URL(url+'?'+searchParams.toString(), backendUrl);
  return fetch(src.toString() ,{ next: { revalidate: 3600 } }).then(res => res.json()).catch(console.error);
}
