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

  const setCartProduct = (qty: number) => {
    appContext.setSharedState?.((state) => {
      if (typeof qty === "number" && qty > 0) {
        state.cartProducts = state.cartProducts || {};
        state.cartProducts[productId] = {
          ...state?.cartProducts?.[productId],
          id: productId,
          quantity: qty,
        };
      } else if ((!qty || qty <= 0) && state?.cartProducts?.[productId]) {
        delete state.cartProducts[productId];
      }

      return { ...state };
    });
  };

  const productQty =
    appContext?.sharedState?.cartProducts?.[productId]?.quantity || 0;

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
