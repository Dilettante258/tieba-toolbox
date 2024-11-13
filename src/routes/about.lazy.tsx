import { createLazyFileRoute } from '@tanstack/react-router'
import TripleSelectInput from "@components/TripleSelectInput.tsx";


export const Route = createLazyFileRoute('/about')({
  component: About,
})

function About() {
  return <div className="p-2">Hello from About!


    <TripleSelectInput />

  </div>
}
