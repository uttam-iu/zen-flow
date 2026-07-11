import Link from "next/link"
import { Lock, Mail, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function RegisterForm() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">Registration</CardTitle>
          {/* <CardDescription>শুরু করতে নিচের ফর্মটি পূরণ করুন</CardDescription> */}
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input id="name" type="text" placeholder="John Doe" className="pl-10" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input id="email" type="email" placeholder="name@example.com" className="pl-10" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input id="password" type="password" className="pl-10" required />
            </div>
          </div>
          <div className="flex items-center space-x-2 pt-1">
            <Checkbox id="terms" required />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I Agree <Link href="/terms" className="text-teal-600 hover:underline">Terms & Condition</Link>
            </label>
          </div>
                    <div className="flex justify-center"><Button className="text-teal-500 cursor-pointer" variant={'outline'} type="submit">Sing Up</Button></div>

        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-center gap-1 text-sm text-muted-foreground">
          Already Have an Account?{" "}
          <Link href="/login" className="font-medium text-teal-600 hover:underline">
            Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
