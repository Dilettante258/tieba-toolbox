import { queryOptions } from '@tanstack/react-query'

export const userPostsOptions = queryOptions({
  queryKey: [],
  queryFn: async () => {
    const response = await fetch('http://localhost:3001/user/posts?id=3364447105')
    return response.json()
  },
})
