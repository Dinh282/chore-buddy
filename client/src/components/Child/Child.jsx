import styles from "./Child.module.css";
import ChoreCard from "../ChoreCard"

function Child() {
  return (
  <>
  <ChoreCard />
  <h1 className={styles.title}>Child dashboard</h1>;
  </>
  )
}

export default Child;
