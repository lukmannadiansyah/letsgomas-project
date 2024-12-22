/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { useSession } from "next-auth/react";
import styles from "./ModalDeleteArticle.module.scss";
import { Dispatch, SetStateAction, useState } from "react";
import { Content } from "firebase/vertexai-preview";
import articleServices from "@/services/article";

type Proptypes = {
  setArticlesData: Dispatch<SetStateAction<Content[]>>;
  deletedArticle: Content | any;
  setDeletedArticle: Dispatch<SetStateAction<any>>;
  setSuccessMessage: Dispatch<SetStateAction<string>>;
};

const ModalDeleteArticle = (props: Proptypes) => {
  const {
    deletedArticle,
    setDeletedArticle,
    setArticlesData,
    setSuccessMessage,
  } = props;
  const session: any = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    const result = await articleServices.deleteArticle(
      deletedArticle.id,
      session.data?.accessToken
    );
    if (result.status === 200) {
      setIsLoading(false);
      setDeletedArticle({});
      const { data } = await articleServices.getAllArticles();
      setArticlesData(data.data);
      setSuccessMessage("Data berhasil dihapus!");

      setTimeout(() => setSuccessMessage(""), 5000);
    } else {
      setIsLoading(false);
    }
  };

  return (
    <Modal onClose={() => setDeletedArticle({})}>
      <h1>Apakah Anda yakin ingin menghapus artikel ini?</h1>
      <Button
        type="button"
        onClick={handleDelete}
        className={styles.modal__button}
        disabled={isLoading}
      >
        {isLoading ? "Menghapus..." : "Hapus"}
      </Button>
    </Modal>
  );
};

export default ModalDeleteArticle;
