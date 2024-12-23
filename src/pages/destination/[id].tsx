// DetailDestination.tsx
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import styles from "./Detail.module.scss";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { Timestamp } from "firebase/firestore";
import Footer from "@/components/fragments/Footer";

type DestinationProps = {
  destination: {
    id: string;
    name: string;
    description: string;
    image1: string;
    image2: string;
    image3: string;
    location: string;
    contact: string;
    opening_hours: string;
    close_hours: string;
    average_rating: number;
    total_reviews: number;
    created_at: Timestamp;
    updated_at: Timestamp;
  };
};

const DetailDestination = ({ destination }: DestinationProps) => {
  const router = useRouter();

  if (!destination) {
    return <p>Loading...</p>;
  }

  const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

  return (
    <>
      <div className={styles.container}>
        <main className={styles.main}>
          <header className={styles.header}>
            <h1>{destination.name}</h1>
          </header>
          <div className={styles.rating}>
            {[...Array(Math.floor(destination.average_rating))].map(
              (_, index) => (
                <span key={index} className={styles.star}>
                  ★
                </span>
              )
            )}
            <span className={styles.ratingValue}>
              ({Number(destination.average_rating || 0).toFixed(1)})
            </span>
            <p className={styles.totalReviews}>
              Jumlah Ulasan: {destination.total_reviews}
            </p>
          </div>
          <div className={styles.imageGallery}>
            {[destination.image1, destination.image2, destination.image3].map(
              (image, index) => (
                <div key={index} className={styles.imageWrapper}>
                  <Image
                    src={image}
                    alt={`${destination.name} ${index + 1}`}
                    width={350}
                    height={300}
                    className={styles.img}
                  />
                </div>
              )
            )}
          </div>
          <div className={styles.details}>
            <p className={styles.description}>{destination.description}</p>
            <div className={styles.location}>
              <div className={styles.locationIcon}>
                <Image
                  src={"/icon_location.png"}
                  alt="search"
                  width={25}
                  height={25}
                />
              </div>
              <p>{destination.location}</p>
            </div>
            <div className={styles.hours}>
              <div className={styles.clockIcon}>
                <Image
                  src={"/icon_clock.png"}
                  alt="search"
                  width={25}
                  height={25}
                />
              </div>
              <div className={styles.hoursContent}>
                {days.map((day) => (
                  <div key={day} className={styles.dayHours}>
                    <p className={styles.day}>{day}</p>
                    <p className={styles.hoursRange}>
                      {destination.opening_hours} - {destination.close_hours}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.contact}>
              <div className={styles.contactIcon}>
                <Image
                  src={"/icon_contact.png"}
                  alt="search"
                  width={25}
                  height={25}
                />
              </div>
              <p>{destination.contact}</p>
            </div>
          </div>
          <Button type="button" onClick={() => router.push("/")}>
            Kembali
          </Button>
        </main>
      </div>
      <Footer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/destination?id=${id}`
  );
  const data = await res.json();

  if (!data.status) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      destination: data.data,
    },
  };
};

export default DetailDestination;
