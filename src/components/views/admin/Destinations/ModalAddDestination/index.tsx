/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import destinationServices from "@/services/destination";
import { Content } from "firebase/vertexai-preview";
import { useSession } from "next-auth/react";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";

type Proptypes = {
  setModalAddDestination: Dispatch<SetStateAction<boolean>>;
  setDestinationsData: Dispatch<SetStateAction<Content[]>>;
};

const ModalAddDestination = (props: Proptypes) => {
  const { setModalAddDestination, setDestinationsData } = props;
  const [isLoading, setIsLoading] = useState(false);
  const session: any = useSession();
  const [images, setImages] = useState<File[]>([]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      setImages(files);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form: any = event.target as HTMLFormElement;

    let data: {
      name: string;
      description: string;
      location: string;
      opening_hours: string;
      close_hours: string;
      contact: number;
      total_reviews: number;
      average_rating: number;
    } = {
      name: form.name.value.trim(),
      description: form.description.value.trim(),
      location: form.location.value.trim(),
      opening_hours: form.open.value.trim(),
      close_hours: form.close.value.trim(),
      contact: form.contact.value.trim(),
      total_reviews: form.reviews.value.trim(),
      average_rating: form.rating.value.trim(),
    };

    let imagePaths: Record<string, string> = {};
    if (images.length > 0) {
      const formData = new FormData();
      images.forEach((image) => formData.append("images", image)); 

      const uploadResult = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (uploadResult.ok) {
        imagePaths = await uploadResult.json();
        data = { ...data, ...imagePaths }; 
      }
    }

    const result = await destinationServices.addDestination(
      data,
      session.data?.accessToken
    );
    if (result.status === 200) {
      setIsLoading(false);
      form.reset();
      const { data } = await destinationServices.getAllDestinations();
      setDestinationsData(data.data);
    } else {
      setIsLoading(false);
    }
  };

  return (
    <Modal onClose={() => setModalAddDestination(false)}>
      <h1>Tambah Destinasi</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Nama" name="name" type="text" />
        <Input label="Deskripsi" name="description" type="text" />
        <Input label="Lokasi" name="location" type="text" />
        <Input label="Jam Buka" name="open" type="text" />
        <Input label="Jam Tutup" name="close" type="text" />
        <Input label="Kontak" name="contact" type="number" />
        <Input label="Jumlah Ulasan" name="reviews" type="number" />
        <Input label="Total Rating" name="rating" type="number" />
        <Input
          type="file"
          name="images"
          onChange={handleImageChange}
          multiple
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Tambah Destinasi"}
        </Button>
      </form>
    </Modal>
  );
};

export default ModalAddDestination;
