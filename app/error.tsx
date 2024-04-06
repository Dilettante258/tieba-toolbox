'use client' // Error components must be Client Components

import { useEffect } from 'react'
import {Button} from "@nextui-org/react";

export default function Error({error, reset}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div id="unusual-page">
      <p className="text-lg">Something went wrong!</p>
      <Button
        onClick={
          () => reset()
        }
        color="primary"
      >
        重试
      </Button>
    </div>
  )
}