import styles from "./Banyumas.module.scss";
import Image from "next/image";
import Footer from "@/components/fragments/Footer";

const Banyumas = () => {
  return (
    <>
      <div className={styles.container}>
        <main className={styles.main}>
          <h1>Banyumas</h1>
          <p>
            Banyumas adalah salah satu kabupaten yang berada di Provinsi Jawa
            Tengah, yang beribu kota di Purwokerto. Kabupaten ini berbatasan
            dengan Kabupaten Brebes di utara; Kabupaten Purbalingga, Kabupaten
            Banjarnegara, dan Kabupaten Kebumen di timur, serta Kabupaten
            Cilacap di sebelah selatan dan barat. Gunung Slamet, gunung
            tertinggi di Jawa Tengah terdapat di ujung utara wilayah kabupaten
            ini. Kabupaten Banyumas merupakan bagian dari wilayah budaya
            Banyumasan, yang berkembang di bagian barat Jawa Tengah. Bahasa yang
            dituturkan adalah bahasa Banyumasan, yaitu salah satu dialek bahasa
            Jawa yang cukup berbeda dengan dialek standar bahasa Jawa (dialek
            Mataraman). Masyarakat dari bahasa dan daerah lain kerap
            menjulukinya <q>ngapak</q> karena ciri khas bunyi /k/ yang dibaca
            penuh pada akhir kata (berbeda dengan dialek Mataraman). Bahasa
            Ngapak sering disebut juga Dialek Banyumasan dan Bahasa
            Panginyongan. Tentu bukan itu saja hal-hal menarik dari Banyumas.
            Berikut enam fakta menarik seputar Kabupaten Banyumas:
          </p>

          <div className={styles.section}>
            <h2>Arti Banyumas</h2>
            <p>
              Kata Banyumas berasal dari dua kata: banyu dan mas. Banyu berarti{" "}
              <q>air</q>, mas berarti <q>emas</q>. Nama tersebut diberikan oleh
              seorang pemuda dari Roma yang mengembara hingga ke wilayah ini.
            </p>
          </div>

          <div className={styles.section}>
            <h2>Budaya Banyumasan</h2>
            <div className={styles.image}>
              <Image
                src="/images/budaya.jpg"
                alt="Budaya Banyumasan"
                width={686}
                height={400}
              />
            </div>
            <p>
              Budaya Banyumasan memiliki ciri khas tersendiri yang berbeda
              dengan wilayah lain di Jawa Tengah, walaupun akarnya masih
              merupakan budaya Jawa. Di antara seni pertunjukan yang terdapat di
              Banyumas antara lain wayang kulit gagrag Banyumas.
            </p>
          </div>

          <div className={styles.section}>
            <h2>Destinasi Wisata</h2>
            <div className={styles.image}>
              <Image
                src="/images/wisata.jpg"
                alt="Destinasi Wisata Banyumas"
                width={600}
                height={400}
              />
            </div>
            <p>
              Tempat atau destinasi wisata di Banyumas sangat berlimpah, mulai
              dari wisata alam seperti Baturraden, Pancuran Pitu, hingga wisata
              sejarah seperti Museum Wayang Sendang Mas.
            </p>
          </div>

          <div className={styles.section}>
            <h2>Tarian dan Seni Tradisional</h2>
            <div className={styles.image}>
              <Image
                src="/images/tarian.jpg"
                alt="Tempe Mendoan"
                width={800}
                height={400}
              />
            </div>
            <p>
              Banyumas memiliki banyak tarian tradisional, di antaranya Tari
              Jengger yang dimainkan oleh dua orang perempuan atau lebih, serta
              Ebeg, yaitu kesenian kuda lumping khas Banyumas.
            </p>
          </div>

          <div className={styles.section}>
            <h2>Kuliner Khas Banyumas</h2>
            <div className={styles.image}>
              <Image
                src="/images/mendoan.jpg"
                alt="Tempe Mendoan"
                width={565}
                height={400}
              />
            </div>
            <p>
              Banyumas terkenal dengan kuliner tempe mendoan yang terbuat dari
              tempe yang dibalut tepung dan digoreng setengah matang, serta Soto
              Sokaraja dan Getuk Goreng Sokaraja.
            </p>
          </div>

          <div className={styles.section}>
            <h2>Batik Banyumas</h2>
            <div className={styles.image}>
              <Image
                src="/images/batik.jpg"
                alt="Batik Banyumas"
                width={533}
                height={400}
              />
            </div>
            <p>
              Batik Banyumas memiliki keunikan karena kedua sisi muka dan
              belakangnya memiliki kualitas yang hampir sama. Batik ini semakin
              dikenal, dengan sentra batiknya berada di jalan Mruyung, kompleks
              alun-alun kota Banyumas.
            </p>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Banyumas;
