import { useEffect, useState } from "react";
import styles from "./Home.module.scss";
import Image from "next/image";
import { Content as FirebaseContent } from "firebase/vertexai-preview";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useRouter } from "next/router";
import Footer from "@/components/fragments/Footer";

type Content = FirebaseContent & {
  id: string;
  name: string;
  average_rating: number;
  total_reviews: number;
  image1: string;
  image2: string;
  image3: string;
};

type PropTypes = {
  destinations: Content[];
};

const HomeView = (props: PropTypes) => {
  const { destinations } = props;
  const [destinationsData, setDestinationsData] = useState<Content[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [showFilter, setShowFilter] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let filteredData = destinations.filter((destination) =>
      destination.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (selectedRating !== null) {
      filteredData = filteredData.filter(
        (destination) => destination.average_rating === selectedRating
      );
    }

    setDestinationsData(filteredData);
  }, [searchQuery, destinations, selectedRating]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleRatingSelect = (rating: number) => {
    setSelectedRating(rating);
    setShowFilter(false);
  };

  return (
    <>
      <div className={styles.container}>
        <main className={styles.main}>
          <h2 className={styles.titleSearch}>Mau ke mana?</h2>
          <div className={styles.search}>
            <div className={styles.searchInput}>
              <div className={styles.searchIcon}>
                <Image
                  src={"/icon_search.png"}
                  alt="search"
                  width={20}
                  height={20}
                />
              </div>
              <Input
                type="text"
                placeholder="Cari"
                name="search"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <Button type="button" onClick={() => setShowFilter(true)}>
              Filter
            </Button>
          </div>

          {showFilter && (
            <div className={styles.filterModal}>
              <div className={styles.modalContent}>
                <h3>Pilih Rating</h3>
                <div className={styles.stars}>
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <span
                      key={rating}
                      className={`${styles.star} ${
                        selectedRating === rating ? styles.selected : ""
                      }`}
                      onClick={() => handleRatingSelect(rating)}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <Button type="button" onClick={() => setShowFilter(false)}>
                  Tutup
                </Button>
              </div>
            </div>
          )}

          <h2 className={styles.subtitle}>Objek Wisata di Banyumas</h2>
          {destinationsData.length > 0 ? (
            <div className={styles.destinationObjects}>
              {destinationsData.map((destination) => (
                <div
                  key={destination.id}
                  className={styles.destinationObject}
                  style={{ cursor: "pointer" }}
                >
                  <div
                    className={styles.objectDetails}
                    onClick={() =>
                      router.push(`/destination/${destination.id}`)
                    }
                  >
                    <h2>{destination.name}</h2>
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
                    </div>
                    <p className={styles.totalReviews}>
                      Jumlah Ulasan: {destination.total_reviews}
                    </p>
                  </div>
                  <div className={styles.imageDestination}>
                    <Image
                      src={destination.image1}
                      alt={destination.name}
                      width={200}
                      height={200}
                    />
                    <Image
                      src={destination.image2}
                      alt={destination.name}
                      width={200}
                      height={200}
                    />
                    <Image
                      src={destination.image3}
                      alt={destination.name}
                      width={200}
                      height={200}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.noResults}>
              <p>Tidak ada hasil yang ditemukan untuk pencarian Anda.</p>
            </div>
          )}
        </main>
      </div>
      <Footer />
    </>
  );
};

export default HomeView;
