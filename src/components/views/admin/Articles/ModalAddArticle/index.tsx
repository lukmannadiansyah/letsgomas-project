/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import articleServices from "@/services/article";
import { Content } from "firebase/vertexai-preview";
import { useSession } from "next-auth/react";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";

type Proptypes = {
  setModalAddArticle: Dispatch<SetStateAction<boolean>>;
  setArticlesData: Dispatch<SetStateAction<Content[]>>;
};

const ModalAddArticle = (props: Proptypes) => {
  const { setModalAddArticle, setArticlesData } = props;
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
      title: string;
      content: string;
      createdAt: string;
      author_name: string;
    } = {
      title: form.title.value.trim(),
      content: form.content.value.trim(),
      createdAt: form.createdAt.value.trim(),
      author_name: form.author.value.trim(),
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

    const result = await articleServices.addArticle(
      data,
      session.data?.accessToken
    );
    if (result.status === 200) {
      setIsLoading(false);
      form.reset();
      const { data } = await articleServices.getAllArticles();
      setArticlesData(data.data);
    } else {
      setIsLoading(false);
    }
  };

  return (
    <Modal onClose={() => setModalAddArticle(false)}>
      <h1>Tambah Artikel</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Judul" name="title" type="text" />
        <Input label="Konten" name="content" type="text" />
        <Input label="Penulis" name="author" type="text" />
        <Input label="Tanggal dibuat (dd/mm/yy)" name="createdAt" type="text" />
        <Input
          type="file"
          name="images"
          onChange={handleImageChange}
          multiple
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Tambah Artikel"}
        </Button>
      </form>
    </Modal>
  );
};

export default ModalAddArticle;
