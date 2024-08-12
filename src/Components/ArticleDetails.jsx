import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import FetchNews from '../ApiCall';
import moment from 'moment';
import '../Styles/ArticleDetails.css'

const ArticleDetails = () => {
  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { title } = useParams();

    useEffect(() => {
        const singleArticle = async() => {
            try {
                setLoading(true)
                const articles = await FetchNews()
                const foundArticle = articles.find(art => art.title === title)
                const fullContent = foundArticle.description ? `${foundArticle.description} ${foundArticle.content}` : foundArticle.content;
            setArticle({ ...foundArticle, content: fullContent }); 
                setLoading(false)
            } catch (error){
                setError("Can't display information, please try again later.")
            }
        }
        singleArticle()
    }, [title])

    if (loading) {
        return <p className='loadingText'>Loading...</p>;
      }
    
      if (error) {
        return <div><p>{error}</p></div>;
      }

  return (
    <div className='singleWrapper'>
            <h1 className='singleTitle'>{article.title}</h1>
    <article className='singleArticle'>
        <div className='firstSection'>
            <img className='singleArticleImage'src={article.urlToImage} alt={article.title}/>
        </div>
        <div className='secondSection'>
            <h2 className='singleArticleDescription'><strong>Content:</strong> {article.content}</h2>
            <h3 className='singleDate'><strong>Published:</strong> {moment(article.publishedAt).format('MMMM Do YYYY, h:mm:ss a')}</h3>
            <button className='toSourceButton'>
            <a href={article.url} className='toSource' target='_blank' rel='noopener noreferrer'>
            Main Article Source
          </a>
            </button>
        </div>
        </article> 
        <button className='backButton'>
        <Link className='backLink' to='/'>Back to Articles</Link>
      </button>
    </div>
  )
}

export default ArticleDetails