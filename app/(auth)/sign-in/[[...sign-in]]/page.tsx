import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return <SignIn forceRedirectUrl="/after-signup" appearance={{ variables: { colorPrimary: "#111" } }} />
}