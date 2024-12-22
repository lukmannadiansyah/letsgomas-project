/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import AdminLayout from "@/components/layouts/AdminLayout";
import Button from "@/components/ui/Button";
import styles from "./Articles.module.scss";
import { useEffect, useState } from "react";
import { Content } from "firebase/vertexai-preview";
import ModalAddArticle from "./ModalAddArticle";
import ModalUpdateArticle from "./ModalUpdateArticle";
import ModalDeleteArticle from "./ModalDeleteArticle";

type PropTypes = {
  articles: Content[];
};

const ArticlesAdminView = (props: PropTypes) => {
  const { articles } = props;
  const [updatedArticle, setUpdatedArticle] = useState<any>({});
  const [deletedArticle, setDeletedArticle] = useState<any>({});
  const [modalAddArticle, setModalAddArticle] = useState(false);
  const [articlesData, setArticlesData] = useState<Content[]>([]);
  const [successMessage, setSuccessMessage] = useState<string>("");

  useEffect(() => {
    setArticlesData(articles);
  }, [articles]);

  return (
    <>
      <AdminLayout>
        <div className={styles.article}>
          <h1>Manajemen Artikel</h1>
          {successMessage && (
            <div className={styles.article__successMessage}>
              <p>{successMessage}</p>
            </div>
          )}
          <Button
            type="button"
            className={styles.article__button}
            onClick={() => setModalAddArticle(true)}
          >
            Tambah Artikel
          </Button>
          <div className={styles.article__wrapper}>
            <table className={styles.article__table}>
              <thead className={styles.article__thead}>
                <tr>
                  <th className={styles.article__th}>#</th>
                  <th className={styles.article__th}>Judul</th>
                  <th className={styles.article__th}>Konten</th>
                  <th className={styles.article__th}>Penulis</th>
                  <th className={styles.article__th}>Tanggal dibuat</th>
                  <th className={styles.article__th}>Aksi</th>
                </tr>
              </thead>
              <tbody className={styles.article__tbody}>
                {articlesData.map((article: any, index: number) => (
                  <tr key={article.id}>
                    <td className={styles.article__td}>{index + 1}</td>
                    <td className={styles.article__td}>{article.title}</td>
                    <td className={styles.article__td}>{article.content}</td>
                    <td className={styles.article__td}>
                      {article.author_name}
                    </td>
                    <td className={styles.article__td}>{article.createdAt}</td>
                    <td className={styles.article__td}>
                      <div className={styles.article__action}>
                        <Button
                          type="button"
                          variant="secondary"
                          className={styles.article__buttonUpdate}
                          onClick={() => setUpdatedArticle(article)}
                        >
                          Ubah
                        </Button>
                        <Button
                          type="button"
                          variant="secondary"
                          className={styles.article__buttonDelete}
                          onClick={() => setDeletedArticle(article)}
                        >
                          Hapus
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </AdminLayout>
      {modalAddArticle && (
        <ModalAddArticle
          setModalAddArticle={setModalAddArticle}
          setArticlesData={setArticlesData}
        />
      )}
      {Object.keys(updatedArticle).length > 0 ? (
        <ModalUpdateArticle
          updatedArticle={updatedArticle}
          setUpdatedArticle={setUpdatedArticle}
          setArticlesData={setArticlesData}
          setSuccessMessage={setSuccessMessage}
        />
      ) : null}

      {Object.keys(deletedArticle).length > 0 ? (
        <ModalDeleteArticle
          deletedArticle={deletedArticle}
          setDeletedArticle={setDeletedArticle}
          setArticlesData={setArticlesData}
          setSuccessMessage={setSuccessMessage}
        />
      ) : null}
    </>
  );
};

export default ArticlesAdminView;
