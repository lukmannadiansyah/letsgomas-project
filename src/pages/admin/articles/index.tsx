import ArticlesAdminView from '@/components/views/admin/Articles';
import articleServices from '@/services/article';
import { useEffect, useState } from 'react';

const AdminArticlePage = () => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    const getAllArticles = async () => {
      const { data } = await articleServices.getAllArticles();
      setArticles(data.data);
    };
    getAllArticles();
  }, []);
  return (
    <>
      <ArticlesAdminView articles={articles} />
    </>
  );
};

export default AdminArticlePage;
