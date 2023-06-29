import Head from "next/head";
import { useContext } from "react";

import { Text } from "../api/Context/Text";

import favicon from "../public/icons/favicon.ico";
import favicon_apple_touch_icon from "../public/icons/apple-touch-icon.png";
import favicon_32 from "../public/icons/favicon-32x32.png";
import favicon_16 from "../public/icons/favicon-16x16.png";

function CustomHead(props) {
  const text = useContext(Text);
  const seo = text.seo;

  return (
    <Head>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />

      <link rel="manifest" href="/icons/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/icons/safari-pinned-tab.svg"
        color="#5bbad5"
      />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />

      <link rel="shortcut icon" href={favicon.src} />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={favicon_apple_touch_icon.src}
      />
      <link rel="icon" type="image/png" sizes="32x32" href={favicon_32.src} />
      <link rel="icon" type="image/png" sizes="16x16" href={favicon_16.src} />
    </Head>
  );
}

export default CustomHead;
