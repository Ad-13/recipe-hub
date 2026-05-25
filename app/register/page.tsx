"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { register } from "@/actions/auth";

export default function RegisterPage() {
  const router = useRouter()

  const [state, action, isPending] = useActionState(register, null)

  useEffect(() => {
    if (state?.data) {
      router.push('/')
      router.refresh()
    }
  }, [state])

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="card w-full max-w-sm p-8">
        <h1 className="font-display font-bold text-2xl text-text mb-1">
          Create account
        </h1>
        <p className="text-text-muted  mb-8">
          Already have an account?{' '}
          <Link href="/login" className="text-accent hover:text-accent-2 transition-colors">
            Sign in
          </Link>
        </p>

        <form action={action} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className=" font-medium text-text-muted">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              minLength={2}
              placeholder="John Doe"
              className="input-field"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className=" font-medium text-text-muted">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="input-field"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className=" font-medium text-text-muted">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
              placeholder="Min. 8 characters"
              className="input-field"
            />
          </div>

          {state?.error && (
            <p className=" text-amber border border-amber/30 bg-amber-soft rounded-md px-3 py-2">
              {state.error}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="btn-primary w-full justify-center mt-2"
          >
            {isPending ? 'Creating account…' : 'Create account'}
          </button>
        </form>
      </div>
    </div>
  )
}
