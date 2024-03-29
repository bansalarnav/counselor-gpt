import styles from "./index.module.css";

const Loader = ({ size = 1, color = "var(--primary-color)" }) => {
  return (
    <div
      className={styles["lds-ring"]}
      // @ts-ignore
      style={{ "--size-ratio": size, "--loader-color": color }}
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;
