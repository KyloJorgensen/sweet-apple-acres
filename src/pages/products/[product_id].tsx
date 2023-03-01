import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import FiveStarRating from "~/components/FiveStarRating";
import ProductQtyController from "~/components/ProductQtyController";
import Nav from "~/components/Nav";
import { api } from "~/utils/api";

const ProductPage: NextPage = () => {
  const router = useRouter();
  const product_id =
    (Array.isArray(router.query.product_id)
      ? router.query.product_id?.[0]
      : router.query.product_id) || "";
  console.log({ product_id });
  const productQuery = api.product.getProduct.useQuery({
    product_id,
  });

  if (productQuery.isLoading) {
    return <p>Loading</p>;
  }

  if (
    !product_id ||
    productQuery.isError ||
    (productQuery.isFetched && !productQuery.data)
  ) {
    return <p>404 Not Found</p>;
  }

  const product = productQuery.data;

  return (
    <>
      <Head>
        <title>Sweet Apple Acres</title>
        <meta name="description" content="🍎 Sweet Apple Acres" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col">
        <Nav />
        <div className="mx-auto flex w-4/5 flex-col justify-center gap-12 px-4 pt-16">
          <div className="flex flex-row flex-wrap justify-center gap-6">
            <Image
              src={product?.image || ""}
              alt={product.description}
              width={350}
              height={350}
              className={`${product.isAvailable ? "" : "opacity-30"}`}
            />
            <div className="flex max-w-sm flex-grow flex-col gap-6">
              <div className="flex-grow">
                <h1 className="pb-6 text-3xl font-bold">{product.name}</h1>
                <div className="flex flex-grow items-center pb-4">
                  <FiveStarRating rating={product.rating} className="pr-4" />
                  <p>{product.rating}</p>
                </div>
                <p className="pb-6 text-2xl font-bold">
                  ${Number(product.price).toFixed(2)} /ea
                </p>
              </div>
              <ProductQtyController
                productId={product.id}
                isAvailable={product.isAvailable}
                className={`pb-4 ${product.isAvailable ? "" : "opacity-30"}`}
              />
              <p>
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
          </div>
        </div>
      </main>
    </>
  );
};

export default ProductPage;
