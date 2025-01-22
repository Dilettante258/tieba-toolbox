export interface Agree {
  agreeNum: string;
  hasAgree: number;
  agreeType: number;
  disagreeNum: string;
  diffAgreeNum: string;
}

export type RequestProps1 = {
  method: string,
  id: string,
  page: string
}

export type RequestProps2 = {
  method: string,
  id: string
}
