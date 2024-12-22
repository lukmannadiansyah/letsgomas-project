import styles from "./Us.module.scss";
import Image from "next/image";
import Footer from "@/components/fragments/Footer";

const AboutUs = () => {
  const teams = [
    {
      name: "Fathir Hidayah R",
      position: "Project Manager",
      image: "/member1.png",
    },
    {
      name: "Janjang Purwoko Aji",
      position: "Designer",
      image: "/member2.png",
    },
    {
      name: "Yogi Fakhri Aiman",
      position: "Frontend Developer",
      image: "/member3.png",
    },
    { name: "Lukmen", position: "Backend Developer", image: "/member4.png" },
    { name: "Hanif Al Ikhsan", position: "Tester", image: "/member5.png" },
  ];

  return (
    <>
      <div className={styles.container}>
        <main className={styles.main}>
          <section className={styles.teamSection}>
            <h2 className={styles.teamTitle}>LETSGOMAS TEAM</h2>
            <div className={styles.teamLine}></div>
            <div className={styles.memberList}>
              {teams.map((member, index) => (
                <div key={index} className={styles.memberCard}>
                  <div className={styles.memberImage}>
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={200}
                      height={300}
                      className={styles.image}
                    />
                  </div>
                  <div className={styles.memberInfo}>
                    <h3 className={styles.memberName}>{member.name}</h3>
                    <p className={styles.memberPosition}>{member.position}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section className={styles.aboutSection}>
            <h1 className={styles.title}>Tentang Kami</h1>
            <p className={styles.paragraph}>
              Selamat datang di <strong>Letsgomas</strong>, platform informasi
              wisata Banyumas yang dirancang untuk memudahkan Anda menjelajahi
              keindahan alam, budaya, dan kekayaan lokal di Kabupaten Banyumas.
            </p>
            <div className={styles.section}>
              <h2 className={styles.subtitle}>Misi Kami</h2>
              <ul className={styles.list}>
                <li>
                  <strong>
                    Menghubungkan Wisatawan dengan Destinasi Lokal
                  </strong>
                  <br />
                  Kami ingin menjadikan Banyumas lebih dikenal luas dengan
                  menghadirkan informasi yang akurat, lengkap, dan mudah diakses
                  tentang berbagai tempat wisata.
                </li>
                <li>
                  <strong>Mendukung Komunitas Lokal</strong>
                  <br />
                  Dengan mempromosikan destinasi, budaya, dan produk lokal, kami
                  berupaya mendukung pertumbuhan ekonomi masyarakat sekitar.
                </li>
                <li>
                  <strong>Meningkatkan Pengalaman Wisata</strong>
                  <br />
                  Melalui ulasan, rating, dan panduan wisata, kami memberikan
                  informasi terbaik agar Anda dapat merencanakan perjalanan yang
                  tak terlupakan.
                </li>
              </ul>
            </div>
            <div className={styles.section}>
              <h2 className={styles.subtitle}>Apa yang Kami Tawarkan?</h2>
              <ul className={styles.list}>
                <li>
                  <strong>Informasi Lengkap Destinasi</strong>
                  <br />
                  Jelajahi berbagai tempat wisata alam, kuliner, dan budaya di
                  Banyumas dengan deskripsi mendetail, foto menarik, serta tips
                  berwisata.
                </li>
                <li>
                  <strong>Ulasan dan Rating</strong>
                  <br />
                  Dapatkan rekomendasi terbaik dari wisatawan lain dan bagikan
                  pengalaman Anda sendiri.
                </li>
                <li>
                  <strong>Rencana Perjalanan yang Mudah</strong>
                  <br />
                  Nikmati fitur perencanaan wisata untuk memaksimalkan kunjungan
                  Anda di Banyumas.
                </li>
              </ul>
            </div>
            <p className={styles.tagline}>
              <strong>Letsgomas - Jelajahi Banyumas, Temukan Ceritamu!</strong>
            </p>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
