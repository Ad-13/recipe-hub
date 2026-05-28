import { getSession } from '@/actions/auth'
import NavbarUserMenu from './NavbarUserMenu'

export default async function NavbarAuth() {
  const user = await getSession()
  return <NavbarUserMenu user={user} />
}
