import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value

  // ২. ব্যবহারকারী কোন ইউআরএল (URL) ভিজিট করার চেষ্টা করছে তা নিন
  const { pathname } = request.nextUrl

  // ৩. যদি টোকেন না থাকে এবং ব্যবহারকারী প্রোটেক্টেড রাউটে যেতে চায়
  // এখানে আমরা ধরছি লগইন, রেজিস্ট্রেশন ও রিসেট ছাড়া বাকি সব পেজ প্রোটেক্টেড
  const isAuthPage = pathname.startsWith('/login')
                    || pathname.startsWith('/register')
                    || pathname.startsWith('/forgot-password')

  if (!token && !isAuthPage) {
    // লগইন করা না থাকলে লগইন পেজে রিডাইরেক্ট করুন
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // ৪. যদি লগইন করা থাকে এবং ব্যবহারকারী আবার লগইন/রেজিস্ট্রেশন পেজে যেতে চায়
  if (token && isAuthPage) {
    // তাকে ড্যাশবোর্ড বা হোম পেজে রিডাইরেক্ট করুন
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

// ৫. কোন কোন রাউটে এই মিডলওয়্যারটি কাজ করবে তা নির্দিষ্ট করুন
export const config = {
  matcher: [
    /*
     * নিচের ফাইল বাদে সব রাউটে মিডলওয়্যার রান করবে:
     * - api (এপিআই রাউটস)
     * - _next/static (স্ট্যাটিক ফাইলস)
     * - _next/image (ইমেজ অপ্টিমাইজেশন ফাইলস)
     * - favicon.ico (ফ্যাভিকন ফাইল)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
