"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login } from "@/actions/auth";

export default function LoginPage() {
  const router = useRouter();

  const [state, action, isPending] = useActionState(login, null)

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
          Welcome back
        </h1>
        <p className="text-text-muted  mb-8">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-accent hover:text-accent-2 transition-colors">
            Sign up
          </Link>
        </p>

        <form action={action} className="flex flex-col gap-4">
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
              placeholder="Your password"
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
            {isPending ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}
