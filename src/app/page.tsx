import Image from "next/image";
import styles from "./page.module.css";
import Counter from "@/TestReduxCounter/Counter";
import ContactForm from "./components/testContactForm/ContactForm";

export default function Home() {
  return (
    <div className={styles.page}>
      <h1>Test de Conexión a Firebase Storage,mongo y redux</h1>
      {/* <Counter /> */}
      <ContactForm/>
    </div>
  );
}
