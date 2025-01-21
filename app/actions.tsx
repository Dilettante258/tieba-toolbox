'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function TSIForm(data: FormData) {
  if(data.get('id') === '') redirect('/userpost');


  redirect(`/userpost/${data.get('method')}/${data.get('id')}/1`)
}
