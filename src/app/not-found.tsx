import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-background text-foreground">
      <div className="w-full max-w-md text-center space-y-6">
        <div className="relative mx-auto">
          <Image
            src="/404.png"
            alt="404 Not Found"
            width={300}
            height={200}
            className="mx-auto rounded-lg shadow-[0_0_15px_rgba(138,43,226,0.6)]"
            priority
          />
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Page Not Found</h1>
          <p className="text-muted-foreground">The page you are looking for does not exist.</p>
          <div className="pt-2">
            <Link href="/">
              <Button variant="gradient" size="lg">
                Return to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
