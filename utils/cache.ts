
function fetchUserId(UserName: string): Promise<number> {
  return fetch(`/tiebac/i/sys/user_json?un=${decodeURI(UserName)}&ie=utf-8`)
    .then(res => {
      if (res) {
        return res.json();
      } else {
        return {id: -1};
      }
    })
    .then(data => {
      return data.id;
    });
}

function fetchForumName(fid: number): Promise<string> {
  return fetch(`https://tb-api.wang1m.tech/forum/getName?fid=${fid}`)
    .then(res => {
      return res.text();
    });
}

export async function getForumName(fid:number) {
  let forumPairs = JSON.parse(localStorage.getItem("forumPairs") || "{}");

  if (forumPairs[fid]) {
    return forumPairs[fid];
  }

  let username = await fetchForumName(fid);

  forumPairs[fid] = username;
  localStorage.setItem("forumPairs", JSON.stringify(forumPairs));

  return username;
}

export async function getUserId(UserName:string) {
  let forumPairs = JSON.parse(localStorage.getItem("userPairs") || "{}");

  if (forumPairs[UserName]) {
    return forumPairs[UserName];
  }

  fetchUserId(UserName).then((id) => {
    forumPairs[UserName] = id;
    localStorage.setItem("userPairs", JSON.stringify(forumPairs));
  });

  return forumPairs[UserName];
}

import { useEffect, useState } from 'react';

const isServer = typeof window === 'undefined';

export function useLocalStorage(key: string, initialValue: string | object | number) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => initialValue);

  const initialize = () => {
    if (isServer) {
      return initialValue;
    }
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  };

  /* prevents hydration error so that state is only initialized after server is defined */
  useEffect(() => {
    if (!isServer) {
      setStoredValue(initialize());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: string | object | number) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };
  return [storedValue, setValue];
}
