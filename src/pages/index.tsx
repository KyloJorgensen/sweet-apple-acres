import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const products = api.product.getProducts.useQuery({});

  return (
    <>
      <Head>
        <title>Sweet Apple Acres</title>
        <meta name="description" content="🍎 Sweet Apple Acres" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          Products
          {products.error && (
            <code>{JSON.stringify(products.error, null, 2)}</code>
          )}
          {products?.data?.map((product, index) => (
            <div key={`${product.id}-${index}`}>
              <code>{JSON.stringify(product, null, 2)}</code>
              <img
                src={product?.image || ""}
                alt={product.description}
                width="100px"
                height="100px"
              />
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;
