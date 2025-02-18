'use server'

import { redirect } from 'next/navigation'

export async function UserPostForm(data: FormData) {
  if(data.get('id') === '') redirect('/userpost');
  redirect(`/userpost/${data.get('method')}/${data.get('id')}/1`)
}

export async function LikeForumForm(data: FormData) {
  if(data.get('id') === '') redirect('/likeForum');
  redirect(`/likeForum/${data.get('method')}/${data.get('id')}`)
}

export async function ProfileForm(data: FormData) {
  if(data.get('id') === '') redirect('/profile');
  redirect(`/profile/${data.get('method')}/${data.get('id')}`)
}

export async function FollowForm(data: FormData) {
  if(data.get('id') === '') redirect('/follow');
  redirect(`/follow/${data.get('method')}/${data.get('id')}`)
}
