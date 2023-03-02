import Link from "next/link";
import { useAppContext } from "~/context/state";

const ProductQtyController: React.FC<{
  className?: string;
  productId: string;
  isAvailable?: boolean;
  hideAddToCart?: boolean;
}> = ({
  className = "",
  productId,
  isAvailable = true,
  hideAddToCart = false,
}) => {
  const appContext = useAppContext();

  const setCartProduct = (quantity: number) => {
    appContext.setSharedState?.((state) => {
      if (typeof quantity === "number" && quantity > 0) {
        state.cartProducts = state.cartProducts || {};
        state.cartProducts[productId] = {
          ...state?.cartProducts?.[productId],
          productId,
          quantity,
        };
      } else if (
        (!quantity || quantity <= 0) &&
        state?.cartProducts?.[productId]
      ) {
        delete state.cartProducts[productId];
      }

      return { ...state };
    });
  };

  const productQty =
    appContext?.sharedState?.cartProducts?.[productId]?.quantity || 0;
  const plusButton = (
    <button
      className="flex h-9 w-9 items-center justify-center rounded-full border border-solid border-green-600 bg-green-600 text-white hover:border-green-800 hover:bg-green-800"
      onClick={() => {
        setCartProduct(productQty + 1);
      }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="#343538"
        xmlns="http://www.w3.org/2000/svg"
        className="m-0 fill-current"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12 3.5A1.5 1.5 0 0113.5 5v5.5H19a1.5 1.5 0 011.493 1.355L20.5 12a1.5 1.5 0 01-1.5 1.5h-5.5V19a1.5 1.5 0 01-1.355 1.493L12 20.5a1.5 1.5 0 01-1.5-1.5v-5.5H5a1.5 1.5 0 01-1.493-1.355L3.5 12A1.5 1.5 0 015 10.5h5.5V5a1.5 1.5 0 011.355-1.493L12 3.5z"
        ></path>
      </svg>
    </button>
  );
  if (!(productQty > 0)) {
    return (
      <div className={`flex ${className}`}>
        <span className="mx-4 my-4 flex flex-grow flex-row items-center justify-between rounded-full border border-solid border-transparent text-white">
          <div />
          {plusButton}
        </span>
      </div>
    );
  }

  return (
    <div className={`flex ${className}`}>
    <span className="mx-4 my-4 flex flex-row flex-grow  items-center justify-between rounded-full border border-solid border-green-600 bg-green-600 text-white">
      <button
        className="flex h-9 w-9 items-center justify-center rounded-full border border-solid border-green-600 bg-green-600 text-white hover:border-green-800 hover:bg-green-800"
        onClick={() => {
          setCartProduct(productQty - 1);
        }}
      >
        {productQty === 1 ? (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="#343538"
            xmlns="http://www.w3.org/2000/svg"
            className="m-0 fill-current"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M17.5 4h-3.563a2 2 0 00-3.874 0H6.5a1.5 1.5 0 100 3h11a1.5 1.5 0 000-3zM7 9a1 1 0 00-1 1v10a2 2 0 002 2h8a2 2 0 002-2V10a1 1 0 00-1-1H7z"
            ></path>
          </svg>
        ) : (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="#343538"
            xmlns="http://www.w3.org/2000/svg"
            className="m-0 fill-current"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M4 12.5A1.5 1.5 0 015.5 11h14a1.5 1.5 0 010 3h-14A1.5 1.5 0 014 12.5z"
            ></path>
          </svg>
        )}
      </button>
      <span aria-live="polite" aria-atomic="true" className="">
        <span
          style={{
            border: "0px",
            clip: "rect(0px, 0px, 0px, 0px)",
            height: "1px",
            margin: "-1px",
            overflow: "hidden",
            padding: "0px",
            position: "absolute",
            width: "1px",
            whiteSpace: "nowrap",
            overflowWrap: "normal",
          }}
        >
          Quantity
        </span>
        <span>{productQty}</span>
      </span>

      {plusButton}
    </span>
    </div>
  );

  return (
    <div
      className={`flex justify-between rounded-xl border border-solid border-gray-600 px-4 py-4 ${className}`}
    >
      <button
        className={`z-10 h-6 w-6 ${
          !isAvailable || productQty === 0 ? "opacity-10" : ""
        }`}
        onClick={() => {
          setCartProduct(productQty - 1);
        }}
        disabled={!isAvailable || productQty === 0}
      >
        -
      </button>
      <span>{productQty}</span>
      <button
        className="z-10 h-6 w-6"
        onClick={() => {
          setCartProduct(productQty + 1);
        }}
        disabled={!isAvailable}
      >
        +
      </button>
      {!hideAddToCart &&
        (productQty === 0 ? (
          <button
            className="z-10"
            onClick={() => {
              setCartProduct(productQty + 1);
            }}
            disabled={!isAvailable}
          >
            Add to Cart
          </button>
        ) : (
          <Link href="/checkout">View Cart</Link>
        ))}
    </div>
  );
};

export default ProductQtyController;
