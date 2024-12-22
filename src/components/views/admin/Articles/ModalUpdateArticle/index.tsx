/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import articleServices from "@/services/article";
import { Content } from "firebase/vertexai-preview";
import { useSession } from "next-auth/react";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";

type Proptypes = {
  setArticlesData: Dispatch<SetStateAction<Content[]>>;
  updatedArticle: Content | any;
  setUpdatedArticle: Dispatch<SetStateAction<any>>;
  setSuccessMessage: Dispatch<SetStateAction<string>>;
};

const ModalUpdateArticle = (props: any) => {
  const {
    updatedArticle,
    setUpdatedArticle,
    setArticlesData,
    setSuccessMessage,
  } = props;
  const [isLoading, setIsLoading] = useState(false);
  const session: any = useSession();
  const handleUpdateArticle = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form: any = event.target as HTMLFormElement;
    const data = {
      title: form.title.value.trim(),
      content: form.content.value.trim(),
      createdAt: form.createdAt.value.trim(),
      author_name: form.authorName.value.trim(),
    };

    const result = await articleServices.updateArticle(
      updatedArticle.id,
      data,
      session.data?.accessToken
    );
    if (result.status === 200) {
      setIsLoading(false);
      setUpdatedArticle({});
      const { data } = await articleServices.getAllArticles();
      setArticlesData(data.data);
      setSuccessMessage("Data berhasil diupdate!");

      // Menghapus pesan sukses setelah beberapa detik
      setTimeout(() => setSuccessMessage(""), 5000);
    } else {
      setIsLoading(false);
    }
  };
  return (
    <Modal onClose={() => setUpdatedArticle({})}>
      <h1>Ubah Artikel</h1>
      <form onSubmit={handleUpdateArticle}>
        <Input
          label="Judul"
          name="title"
          type="text"
          defaultValue={updatedArticle.title}
        />
        <Input
          label="Konten"
          name="content"
          type="text"
          defaultValue={updatedArticle.content}
        />
        <Input
          label="Penulis"
          name="authorName"
          type="text"
          defaultValue={updatedArticle.author_name}
        />
        <Input
          label="Tanggal dibuat"
          name="createdAt"
          type="text"
          defaultValue={updatedArticle.createdAt}
        />
        <Button type="submit">{isLoading ? "Updating..." : "Update"}</Button>
      </form>
    </Modal>
  );
};

export default ModalUpdateArticle;
