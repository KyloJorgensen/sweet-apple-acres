import { type NextPage } from "next";
import Head from "next/head";
import Nav from "~/components/Nav";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sweet Apple Acres</title>
        <meta name="description" content="🍎 Sweet Apple Acres" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col">
        <Nav hideCart />
        <div className="container flex flex-col justify-center gap-12 px-4 pt-16 text-center">
          <h2 className="text-2xl font-bold">Order Successful</h2>

          <div className="flex flex-col flex-wrap justify-center gap-12 px-4">
            <p>Thanks for your order!</p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
