import Link from "next/link"

import { UserAuthForm } from "@/app/[locale]/(auth)/signup/component/sign-up-form"
import GoBackButton from "@/components/go-back-btn"
import { Icons } from "@/components/ui/icons"

export const metadata = {
  title: "Create an account",
  description: "Create an account to get started.",
}

export default async function RegisterPage() {
  return (
    <div className="">
      <GoBackButton />

      <div className="bg-muted hidden h-full lg:block" />
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <Icons.Icon className="mx-auto h-6 w-6" />
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-muted-foreground text-xs">
              Enter your email below to create your account
            </p>
          </div>
          <UserAuthForm />
          <p className="text-muted-foreground px-8 text-center text-sm">
            By clicking continue, you agree to our{" "}
            <Link
              href="/terms"
              className="hover:text-brand underline underline-offset-4"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="hover:text-brand underline underline-offset-4"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
