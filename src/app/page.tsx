import App from './App'
import { checkForCookies } from '@/utils/checkForCookies'

export default async function Home() {
  const cookie = await checkForCookies()

  return (
    <div>
      <App cookie={cookie} />
    </div>
  )
}
