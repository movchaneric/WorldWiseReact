import styles from "./Message.module.css";

function Message({ message }) {
  return (
    <p className={styles.message}>
      <span role="img">👋 Add your first city to the list!</span> {message}
    </p>
  );
}

export default Message;
