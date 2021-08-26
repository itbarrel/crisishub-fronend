import Head from 'next/head'
import { Button } from 'antd';
import Link from 'next/link'

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
            <Link href={'/'} passHref={true}>
              <Button type="primary"> Ant Button</Button>
            </Link>
          </center>
      </main>
    </>
  )
}
