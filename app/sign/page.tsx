import { signIn } from "@/app/auth"

function page() {
  return (
    <>
      <form
        action={async () => {
          "use server"
          await signIn("github")
        }}
      >
        <button type="submit">Signin with GitHub</button>
      </form>
    </>
  )
}

export default page;
