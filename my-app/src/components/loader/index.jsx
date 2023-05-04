import { RiseLoader } from "react-spinners";
import "./loader.css";

export const Loader = (props) => {
  return (
      <div className="loader">
        <RiseLoader
          className="loader"
          color={"var(--primary)"}
          loading={props.isLoading}
          size={50}
          aria-label="Loading Spinner"
        />
      </div>
  );
};
