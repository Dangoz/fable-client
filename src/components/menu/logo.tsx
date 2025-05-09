import Image from 'next/image'
import Link from 'next/link'

const Logo = () => {
  return (
    <div className="relative flex items-center justify-center">
      <Link href="/">
        <Image src="/logo.png" alt="Logo" width={80} height={80} className="object-contain transform scale-130" />
      </Link>
    </div>
  )
}

export default Logo
