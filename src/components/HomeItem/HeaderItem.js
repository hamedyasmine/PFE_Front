import { Link } from "react-router-dom";

function HeaderItem({ label, path }) {
  return (
    <li>
      <Link to={path}>{label}</Link>
    </li>
  );
}

export default HeaderItem;
