import Link from "next/link"
import { ArrowLeft, Eye, EyeOff, KeyRound, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React from "react"

export function ResetPasswordForm() {
  const [showNewPassword, setShowNewPassword] = React.useState<boolean>(false);
  const [showNewRePassword, setShowNewRePassword] = React.useState<boolean>(false);

  const onReset = (e: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault()
    // Elements gulo target kora
    const target = e.currentTarget?.elements as typeof e.currentTarget.elements & {
      newPassword: { value: string };
      reNewPassword: { value: string };
    };

    const newPassword = target?.newPassword?.value;
    const reNewPassword = target?.reNewPassword?.value;

    console.log({ newPassword, reNewPassword });

  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <KeyRound className="h-5 w-5" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Reset Password</CardTitle>
          {/* <CardDescription>আপনার অ্যাকাউন্টের জন্য একটি শক্তিশালী পাসওয়ার্ড দিন</CardDescription> */}
        </CardHeader>
        <form onSubmit={onReset}>

          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                >
                  {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="reNewPassword"
                  type={showNewRePassword ? "text" : "password"}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewRePassword(!showNewRePassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                >
                  {showNewRePassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="flex justify-center"><Button className="text-red-500 font-bold cursor-pointer" variant={'outline'} type="submit">Reset</Button></div>

          </CardContent>
        </form>
        <CardFooter className="flex items-center justify-center">
          <Link href="/login" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Go to Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
