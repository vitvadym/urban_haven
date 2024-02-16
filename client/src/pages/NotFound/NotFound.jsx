import { Link } from "react-router-dom";
import notFound from "../../assets/not_found.gif";

export const NotFound = () => {
  return (
    <div className="flex flex-col justify-center">
      <h1 className="mb-2 text-center text-3xl font-bold uppercase">
        Page not found
      </h1>
      <Link title="Back to home page" to="/">
        <img
          src={notFound}
          alt="page not found"
          className="w-full rounded-md shadow-md"
        />
      </Link>
    </div>
  );
};
