import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import FiveStarRating from "~/components/FiveStarRating";
import ProductQtyController from "~/components/ProductQtyController";
import Nav from "~/components/Nav";
import Footer from "~/components/Footer";
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
                className={`px-4 pb-6 ${
                  product.isAvailable ? "" : "opacity-30"
                }`}
              />
              <p className="pb-4">${Number(product.price).toFixed(2)} /ea</p>
              <p className="pb-4 font-bold">{product.name}</p>
              <div className="flex items-center pb-4">
                <FiveStarRating rating={product.rating} className="pr-4" />
                <p>{product.rating}</p>
              </div>
            </Link>
            <ProductQtyController
              className={`pb-4 ${product.isAvailable ? "" : "opacity-30"}`}
              productId={product.id}
              isAvailable={product.isAvailable}
            />
            <p className="pb-4">
              {product.isAvailable ? (
                ""
              ) : (
                <>
                  <span className="font-bold text-red-600">Unavailable</span>
                  <br />
                </>
              )}
              {product.description}
            </p>
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
        <Nav />
        <div className="container mx-auto flex flex-grow flex-col justify-center px-4 pt-16 md:max-w-4xl">
          <h2 className="text-2xl font-bold">Products</h2>
          <ProductList />
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Home;
