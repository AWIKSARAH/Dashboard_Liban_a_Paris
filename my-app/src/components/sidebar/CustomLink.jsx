import { Link } from "react-router-dom";

function CustomLink(props) {
    return (
      <Link
        to={props.route.path}
        className={props.location.pathname === props.route.path ? "selected" : ""}
      >
        {props.location.pathname === props.route.path ? <span></span> : ""}
        {props.route.icon}
        <p>{props.route.label}</p>
      </Link>
    );
  }
export default CustomLink