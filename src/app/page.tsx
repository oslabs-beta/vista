import App from './components/App'
import { checkForCookies } from '@/utils/checkForCookies'

export default async function Home() {
  const cookie = await checkForCookies()

  return (
    <div>
      <App cookie={cookie} />
    </div>
  )
}
