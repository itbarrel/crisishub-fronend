/* eslint-disable class-methods-use-this */
// Document rendered in the server only.
import Document, { Html, Head, Main, NextScript } from "next/document";
import ENV from "../configs";
class UGSports extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="description" content={ENV.siteDescription} />
          <meta property="og:type" content="website" />
          <meta name="og:title" property="og:title" content={ENV.siteName} />
          <meta
            name="og:description"
            property="og:description"
            content={ENV.siteDescription}
          />
          <meta property="og:site_name" content={ENV.siteName} />
          <meta property="og:image" content="/images/ogimg.png" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={ENV.siteName} />
          <meta name="twitter:description" content={ENV.siteDescription} />
          <meta name="twitter:image" content="/images/ogimg.png" />

          <link rel="mask-icon" href="/images/favicon.ico" />

        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default UGSports;
