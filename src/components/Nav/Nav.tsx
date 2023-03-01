import Link from "next/link";
import { useAppContext } from "~/context/state";

const Nav: React.FC = () => {
  const appContext = useAppContext();
  const totalCartQty = Object.values(
    appContext.sharedState.cartProducts
  ).reduce((total = 0, { qty }) => total + qty, 0);
  return (
    <div className="container flex flex-row justify-between px-4 py-6">
      <Link href="/">
        <p className="text-3xl font-bold">🍎 Sweet Apple Acres</p>
      </Link>
      <Link href="/checkout">
        <p className="text-3xl font-bold">🛒 {totalCartQty}</p>
      </Link>
    </div>
  );
};

export default Nav;
