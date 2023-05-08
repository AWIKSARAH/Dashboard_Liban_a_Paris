import React from "react";

const styles = {
  button: {
    appearance: "button",
    backgroundColor: "var(--primary-derv)",
    border: "solid transparent",
    borderRadius: "50px",
    borderWidth: "0 0 4px",
    boxSizing: "border-box",
    color: "#FFFFFF",
    cursor: "pointer",
    display: "inline-block",
    fontSize: "25px",
    fontWeight: "700",
    letterSpacing: ".8px",
    lineHeight: "20px",
    margin: 0,
    outline: "none",
    overflow: "visible",
    padding: "13px 19px",
    textAlign: "center",
    textTransform: "uppercase",
    touchAction: "manipulation",
    transform: "translateZ(0)",
    transition: "filter .2s",
    userSelect: "none",
    WebkitUserSelect: "none",
    verticalAlign: "middle",
    whiteSpace: "nowrap",
    position:"fixed",
    bottom:100,
    right:70,
  },
  after: {
    backgroundClip: "padding-box",
    backgroundColor: "#1CB0F6",
    border: "solid transparent",
    borderRadius: "50%",
    borderWidth: "0 0 4px",
    bottom: "-4px",
    content: "",
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: "-1",
  },
};

function MyButton(props) {
  const handleClick = () => {
    console.log("Button clicked!");
    if (props.onClick) {
      props.onClick();
    }
  };

  return (
    <button
      className="user__form_form"
      style={styles.button}
      onClick={handleClick}
    >
      +
      <div style={styles.after} />
    </button>
  );
}

export default MyButton;
