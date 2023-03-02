import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import ProductQtyController from "~/components/ProductQtyController";
import Nav from "~/components/Nav";
import Footer from "~/components/Footer";
import { api } from "~/utils/api";
import { useAppContext } from "~/context/state";
import { useState } from "react";

const Checkout: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const appContext = useAppContext();
  const productsQuery = api.product.getProducts.useQuery({});
  const placeOrderMutation = api.order.placeOrder.useMutation({});
  const router = useRouter();

  const products =
    productsQuery?.data?.filter?.(
      (product) =>
        product.isAvailable &&
        (appContext?.sharedState?.cartProducts?.[product?.id]?.quantity || 0) >
          0
    ) || [];

  const orderTotal = products.reduce(
    (total = 0, product) =>
      total +
      product.price *
        (appContext?.sharedState?.cartProducts?.[product?.id]?.quantity || 0),
    0
  );

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const response = await placeOrderMutation.mutateAsync({
        name,
        deliveryAddress,
        items: Object.entries(appContext?.sharedState?.cartProducts || {}).map(
          ([productId, { quantity }]) => ({ productId, quantity })
        ),
      });

      console.log(response);
      const query = new URLSearchParams({ orderId: response.id }).toString();
      appContext?.setSharedState?.((state) => ({ ...state, cartProducts: {} }));
      await router.push(`/checkout/confirmation?${query}`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const totalCartQty = Object.values(
    appContext.sharedState.cartProducts
  ).reduce((total = 0, { quantity: qty }) => total + qty, 0);

  if (!(totalCartQty > 0)) {
    return (
      <div className="flex flex-col justify-center gap-12 text-center">
        <p>Oops there are no items in your cart. </p>
        <p>
          <Link href="/" className="text-blue-400 underline">
            Continue Shopping
          </Link>
        </p>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-2xl font-bold">Cart</h2>
      {productsQuery.error && (
        <code>{JSON.stringify(productsQuery.error, null, 2)}</code>
      )}
      <div className="flex flex-col flex-wrap gap-12 px-4">
        {products?.map((product, index) => (
          <div
            key={`${product.id}-${index}`}
            className="flex flex-col flex-wrap items-center justify-end gap-x-10 gap-y-2 sm:flex-row"
          >
            <Link
              className="flex w-full flex-grow flex-row items-center justify-between gap-10 sm:w-min"
              href={`/products/${product.id}`}
            >
              <Image
                src={product?.image || ""}
                alt={product.description}
                width={50}
                height={50}
              />
              <p className="flex-grow">
                <span className="font-bold">{product.name}</span>
                <br />${Number(product.price).toFixed(2)} /ea
              </p>
              <p className="text-bold w-14 text-right sm:hidden">
                $
                {Number(
                  product.price *
                    (appContext?.sharedState?.cartProducts?.[product?.id]
                      ?.quantity || 0)
                ).toFixed(2)}
              </p>
            </Link>
            <div className="justify-right flex w-full flex-wrap-reverse items-center sm:w-max">
              <div className="flex w-52 flex-grow justify-center">
                <ProductQtyController
                  className={`flex-grow ${
                    product.isAvailable ? "" : "opacity-30"
                  }`}
                  productId={product.id}
                  isAvailable={product.isAvailable}
                  hideAddToCart
                />
              </div>
              <p
                className={`text-bold hidden w-14 text-right ${"sm:inline-block"}`}
              >
                $
                {Number(
                  product.price *
                    (appContext?.sharedState?.cartProducts?.[product?.id]
                      ?.quantity || 0)
                ).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
      <p className="text-2xl font-bold">
        Order Total: ${Number(orderTotal).toFixed(2)}
      </p>
      <form
        className="flex flex-col gap-12"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit().catch(console.error);
        }}
      >
        <div className="flex gap-1 pl-4">
          <label htmlFor="name" className="py-4 w-36 text-right">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={name}
            placeholder="Josh Williams"
            className="flex-grow border-b border-solid border-gray-600 px-3"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex gap-1 pl-4">
          <label htmlFor="deliveryAddress" className="py-4 w-36 text-right">
            Delivery Address:
          </label>
          <input
            type="text"
            id="deliveryAddress"
            name="deliveryAddress"
            required
            value={deliveryAddress}
            placeholder="123 Main St. New York City, New York 10001"
            className="flex-grow border-b border-solid border-gray-600 px-3"
            onChange={(e) => setDeliveryAddress(e.target.value)}
          />
        </div>
        <div>
          <input
            type="submit"
            value="Place Order"
            disabled={loading}
            className={`flex rounded-xl border border-solid border-green-600 bg-green-600 px-16 py-4 text-white ${
              loading ? "opacity-30" : ""
            }`}
          />
        </div>
      </form>
    </>
  );
};

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sweet Apple Acres</title>
        <meta name="description" content="🍎 Sweet Apple Acres" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col ">
        <Nav hideCart />
        <div className="container mx-auto flex flex-grow flex-col justify-center gap-12 px-4 pt-16 md:max-w-4xl">
          <Checkout />
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Home;
