import Brand from "@custom/Brand";
import Carousel from "@custom/Carousel";
import ServiceList from "@custom/ServiceList";
import styles from './homepage.module.css'

export default function Home() {
  return (
    <div className={styles.landing}>
      <section className={styles.heading}>
        <Brand />
        <Carousel />
      </section>
      <ServiceList />
    </div>
  );
}
