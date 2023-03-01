import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import ProductQtyController from "~/components/ProductQtyController";
import Nav from "~/components/Nav";
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
      <>
        <p>Oops there are no items in your cart. </p>
        <p>
          <Link href="/" className="text-blue-400 underline">
            Continue Shopping
          </Link>
        </p>
      </>
    );
  }

  return (
    <>
      {productsQuery.error && (
        <code>{JSON.stringify(productsQuery.error, null, 2)}</code>
      )}
      <div className="flex flex-col flex-wrap gap-12 px-4">
        {products?.map((product, index) => (
          <div
            key={`${product.id}-${index}`}
            className="flex flex-row items-center gap-10"
          >
            <Link
              className="flex flex-row items-center justify-center gap-10"
              href={`/products/${product.id}`}
            >
              <Image
                src={product?.image || ""}
                alt={product.description}
                width={50}
                height={50}
              />
              <p className="font-bold">{product.name}</p>
              <p className="">${Number(product.price).toFixed(2)} /ea</p>
            </Link>
            <div className="flex max-w-xs flex-grow justify-center">
              <ProductQtyController
                className={`flex-grow pb-4 ${
                  product.isAvailable ? "" : "opacity-30"
                }`}
                productId={product.id}
                isAvailable={product.isAvailable}
                hideAddToCart
              />
            </div>
            <p className="text-bold">
              $
              {Number(
                product.price *
                  (appContext?.sharedState?.cartProducts?.[product?.id]
                    ?.quantity || 0)
              ).toFixed(2)}
            </p>
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
        <div className="flex gap-1 rounded-xl border border-solid border-gray-600 pl-4">
          <label htmlFor="name" className="py-4">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={name}
            className="flex-grow rounded-r-xl pl-3"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex gap-1 rounded-xl border border-solid border-gray-600 pl-4">
          <label htmlFor="deliveryAddress" className="py-4">
            Delivery Address:
          </label>
          <input
            type="text"
            id="deliveryAddress"
            name="deliveryAddress"
            required
            value={deliveryAddress}
            className="flex-grow rounded-r-xl pl-3"
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
        <div className="mx-auto flex w-4/5 flex-col justify-center gap-12 px-4 pt-16">
          <h2 className="text-2xl font-bold">Cart</h2>
          <Checkout />
        </div>
      </main>
    </>
  );
};

export default Home;
