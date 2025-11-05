import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
// import { getUserByEmail } from '@/db/queries'
import { useUser } from '@clerk/nextjs'

const isPublicRoute = createRouteMatcher(['/sign-in(.*)'])

// Role-based route matchers
const isAdminRoute = createRouteMatcher(['/dashboard/staff(.*)'])
const isMedicRoute = createRouteMatcher(['/dashboard/patients(.*)'])

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect()

    const { userId } = await auth();
    const { user } = await useUser();
    if (userId) {
      // Fetch user role from database
      const usermail = user?.emailAddresses // Assuming userId is email, adjust if needed
      // const role = usermail?.role
      const role = 'admin'

      // Role-based access control
      if (isAdminRoute(req) && role !== 'admin') {
        return new Response('Forbidden', { status: 403 })
      }
      if (isMedicRoute(req) && !['admin', 'medic'].includes(role)) {
        return new Response('Forbidden', { status: 403 })
      }
    }
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}