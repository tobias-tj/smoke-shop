import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return <SignUp forceRedirectUrl="/after-signup" appearance={{ variables: { colorPrimary: "#111" } }} />
}