
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
