import { Link, useLocation } from "react-router-dom";

function CustomLink(props) {
  const location = useLocation();

    return (
      <Link
        to={props.path.path}
        className={location.pathname === props.path.path ? "selected" : ""}
      >
        {location.pathname === props.path.path ? <span></span> : ""}
        {props.path.icon}
        <p>{props.path.label}</p>
      </Link>
    );
  }
export default CustomLink