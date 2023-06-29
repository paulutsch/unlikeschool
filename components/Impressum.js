import styles from "../styles/Impressum.module.css";

const Impressum = ({ text }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{text.title}</h2>
      <div className={styles.content}>
        {text.content.map((text, index) => (
          <p key={`impressum_${index}`}>{text}</p>
        ))}
      </div>
    </div>
  );
};

export default Impressum;
