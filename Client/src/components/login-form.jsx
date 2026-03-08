"use client"

import { useState } from "react"
import { GalleryVerticalEnd } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function LoginForm({
  className,
  onSubmit,     // 👈 receive login handler
  ...props
}) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(email, password)      // 👈 send username/email + password to parent
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-6" />
              </div>
              <span className="sr-only">Acme Inc.</span>
            </a>
            <h1 className="text-xl font-bold">Welcome Back</h1>
            <FieldDescription className="text-white">Login to continue.</FieldDescription>
          </div>

          {/* Email / Username */}
          <Field>
            <FieldLabel htmlFor="email">Username</FieldLabel>
            <Input
              id="email"
              type="text"
              placeholder="yourname"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="text-white font-bold placeholder:text-gray-300 placeholder:font-medium"
            />
          </Field>

          {/* Password */}
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="text-white font-bold placeholder:text-gray-300 placeholder:font-medium"
            />
          </Field>

          {/* Login Button */}
          <Field>
            <Button type="submit" className="w-full bg-green-500 hover:bg-green-400">Login</Button>
          </Field>

          {/* <FieldSeparator>Or</FieldSeparator> */}

          {/* Keep your social buttons unchanged
          <Field className="grid gap-4 sm:grid-cols-2">
            <Button variant="outline" type="button">Continue with Apple</Button>
            <Button variant="outline" type="button">Continue with Google</Button>
          </Field> */}
        </FieldGroup>
      </form>

      <FieldDescription className="px-6 text-center text-white">
        By clicking continue, you agree to our
        <a href="#"> Terms of Service </a> and
        <a href="#"> Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
