import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Nav from "~/components/Nav";
import Footer from "~/components/Footer";

const CheckoutConfirmation: NextPage = () => {
  const router = useRouter();
  const orderId = router.query.orderId;
  return (
    <>
      <Head>
        <title>Sweet Apple Acres</title>
        <meta name="description" content="🍎 Sweet Apple Acres" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col">
        <Nav hideCart />
        <div className="container mx-auto flex flex-grow flex-col justify-center gap-12 px-4 pt-16 text-center md:max-w-4xl">
          <h2 className="text-2xl font-bold">Order Successful</h2>

          <div className="flex flex-col flex-wrap justify-center gap-12 px-4">
            <p>Thanks for your order!</p>
            {orderId && <p>Order Id: {orderId}</p>}
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default CheckoutConfirmation;
