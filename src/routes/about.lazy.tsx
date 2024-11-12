import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/about')({
  component: About,
})

function About() {
  return <div className="p-2">Hello from About!


    import {Text} from 'react-aria-components';

    <MySelect label="Permissions">
      <ListBoxItem textValue="Read">
        <Text slot="label">Read</Text>
        <Text slot="description">Read only</Text>
      </ListBoxItem>
      <ListBoxItem textValue="Write">
        <Text slot="label">Write</Text>
        <Text slot="description">Read and write only</Text>
      </ListBoxItem>
      <ListBoxItem textValue="Admin">
        <Text slot="label">Admin</Text>
        <Text slot="description">Full access</Text>
      </ListBoxItem>
    </MySelect>


  <select>
    <option>1</option>
    <option>2</option>
  </select>
    <input/>
  </div>
}
