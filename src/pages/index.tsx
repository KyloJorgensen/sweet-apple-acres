import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import FiveStarRating from "~/components/FiveStarRating";
import ProductQtyController from "~/components/ProductQtyController";
import { api } from "~/utils/api";

const ProductList: React.FC = () => {
  const products = api.product.getProducts.useQuery({});
  return (
    <>
      {products.error && <code>{JSON.stringify(products.error, null, 2)}</code>}
      <div className="flex flex-row flex-wrap gap-12 px-4 py-16">
        {products?.data?.map((product, index) => (
          <div key={`${product.id}-${index}`} className="flex w-52 flex-col">
            <Link className="flex flex-col" href={`/products/${product.id}`}>
              <Image
                src={product?.image || ""}
                alt={product.description}
                width={200}
                height={200}
                className="px-4 pb-6"
              />
              <p className="pb-4">${Number(product.price).toFixed(2)} /ea</p>
              <p className="pb-4 font-bold">{product.name}</p>
              <div className="flex items-center pb-4">
                <FiveStarRating rating={product.rating} className="pr-4" />
                <p>{product.rating}</p>
              </div>
            </Link>
            <ProductQtyController className="pb-4" productId={product.id} />
            <p className="pb-4">{product.description}</p>
            {/* <p>{product.isAvailable}</p> */}
          </div>
        ))}
      </div>
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
      <main className="flex min-h-screen flex-col">
        <div className="container px-4 py-6">
          <Link href="/">
            <p className="text-3xl font-bold">🍎 Sweet Apple Acres</p>
          </Link>
        </div>
        <div className="container flex flex-col justify-center gap-12 px-4 pt-16">
          <h2 className="text-2xl font-bold">Products</h2>
          <ProductList />
        </div>
      </main>
    </>
  );
};

export default Home;
