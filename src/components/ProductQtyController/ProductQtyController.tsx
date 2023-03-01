import Link from "next/link";
import { useAppContext } from "~/context/state";

const ProductQtyController: React.FC<{
  className?: string;
  productId: string;
}> = ({ className = "", productId }) => {
  const appContext = useAppContext();

  const setCartProduct = (qty: number) => {
    appContext.setSharedState?.((state) => {
      if (typeof qty === "number" && qty > 0) {
        state.cartProducts = state.cartProducts || {};
        state.cartProducts[productId] = {
          ...state?.cartProducts?.[productId],
          id: productId,
          qty,
        };
      } else if ((!qty || qty <= 0) && state?.cartProducts?.[productId]) {
        delete state.cartProducts[productId];
      }

      return { ...state };
    });
  };

  const productQty =
    appContext?.sharedState?.cartProducts?.[productId]?.qty || 0;

  return (
    <div className={`flex justify-between ${className}`}>
      <button
        className="z-10"
        onClick={() => {
          setCartProduct(productQty - 1);
        }}
        disabled={productQty === 0}
      >
        -
      </button>
      <span>{productQty}</span>
      <button
        className="z-10"
        onClick={() => {
          setCartProduct(productQty + 1);
        }}
      >
        +
      </button>
      {productQty === 0 ? (
        <button
          className="z-10"
          onClick={() => {
            setCartProduct(productQty + 1);
          }}
        >
          Add to Cart
        </button>
      ) : (
        <Link href="/checkout">View Cart</Link>
      )}
    </div>
  );
};

export default ProductQtyController;
