import Head from 'next/head'
import { Button } from 'antd';
import Link from '../components/helpers/link'

export default function Home() {
  return (
    <>
      <Head>
        <title>Crises Hub</title>
      </Head>

      <main >
          <center>
            <h1>
              Welcome to Next.js! 
            </h1>
            <Link url={'/a/login'} passHref={true}>
              <Button type="primary"> Ant Button</Button>
            </Link>
          </center>
      </main>
    </>
  )
}
