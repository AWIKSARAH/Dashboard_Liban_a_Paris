import { Link, useLocation } from "react-router-dom";

function CustomLink(props) {
  const location = useLocation();

    return (
      <Link
        to={props.path.to}
        className={location.pathname === props.path.to ? "selected" : ""}
      >
        {location.pathname === props.path.to ? <span></span> : ""}
        {props.path.icon}
        <p>{props.path.label}</p>
      </Link>
    );
  }
export default CustomLink