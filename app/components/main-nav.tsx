import { Link } from '@remix-run/react'

const links = [
  { href: '/', label: 'Home' },
  { href: '/rank', label: 'Rank' },
  { href: '/task', label: 'Task' },
  { href: '/share', label: 'Share' },
  { href: '/wallet', label: 'Wallet' }
]

const MainNav: React.FC = () => {
  return (
    <nav className='fixed inset-x-4 bottom-4 z-40 h-16 flex justify-center'>
      <div className='flex h-full w-full max-w-screen-sm rounded-lg bg-black shadow backdrop-blur-md backdrop-saturate-150'>
        {links.map((link, index) => (
          <Link
            key={index}
            to={link.href}
            className='relative flex shrink-0 grow basis-0 flex-col items-center justify-center'
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default MainNav
