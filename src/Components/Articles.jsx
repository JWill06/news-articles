import React, {useState, useEffect} from 'react'
import '../Styles/Articles.css'
import FetchNews from '../ApiCall'
import Select from 'react-select'
import moment from 'moment'
import { Link } from 'react-router-dom'

function Articles() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState(localStorage.getItem('searchQuery') || '');

    useEffect(() => {
        const loadArticles = async () => {
        try {
            setLoading(true)
            const news = await FetchNews()
            setArticles(news)
            setLoading(false)
        } catch (error){
            setError('Sorry, we are experiencing an issue on our end. Try again!')
        }
    }
       loadArticles();
       if (localStorage.getItem('searchQuery')) {
        setSearchQuery(localStorage.getItem('searchQuery'));
    }
    }, [])

    const handleChange = (e) => {
        setSearchQuery(e.target.value)
        localStorage.setItem('searchQuery', e.target.value);
      }
      const filteredArticles = articles.filter(article =>
        (article.title.toLowerCase().includes(searchQuery.toLowerCase()) ?? "[Removed]")
    );

    const totalMatchingItems = filteredArticles.length;

    const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
    const minPage = Math.max(currentPage - 2, 1);
    const maxPage = Math.min(currentPage + 2, totalPages);


    if (loading) {
        return  <p className='loadingText'>
        <span>.</span>
        <span>.</span>
        <span>.</span>
        <span>l</span>
        <span>o</span>
        <span>a</span>
        <span>d</span>
        <span>i</span>
        <span>n</span>
        <span>g</span>
        </p>
      }

    if (error) {
        return (
          <div className='errorMessage'>
            <p>{error}</p>
          </div>
        );
      }
  return (
    <>
    <div className='filterInputs'>
        <div className='authorFilter'>
        <label htmlFor='search'>Search:</label>
            <input
                type='text'
                name='search'
                value={searchQuery}
                onChange={handleChange}
                placeholder='Search article titles...'
            />
        </div>
    </div>
    {filteredArticles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((article, index) => {
    if (!article.title.includes('[Removed]') && article.urlToImage !== null) {
        return (
            <div key={index} className='articleWrapper'>
                <article className='article'>
                    <h1 className='title'><strong>Title:</strong> {article.title}</h1>
                    <img className='articleImage' src={article.urlToImage} alt={article.title} />
                    <h2 className='articleDescription'><strong>Description:</strong> {article.description}</h2>
                    <h3 className='date'><strong>Published:</strong> {moment(article.publishedAt).format('MMMM Do YYYY, h:mm:ss a')}</h3>
                    <Link to={`/article/${article.title}`} className='moreDetails'>...read more</Link>
                </article> 
            </div>
        );
    }
    return null; // Return null for articles to be excluded
})}
    {totalMatchingItems > 0 && totalMatchingItems === 1? (
    <p className='displayingPages'> {`${totalMatchingItems}`} match.</p>
) : totalMatchingItems > 1 ? (
    <p className='displayingPages'> {`${totalMatchingItems}`} matches.</p>
) : (
    <p className='displayingPages' style={{color: 'red'}}>Nothing to display, try a different search!</p>
)}
    <div className='buttonSection'>
 <button onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))} disabled={currentPage === 1}>Previous</button>
            {Array.from({length: maxPage - minPage + 1}, (_, i) => i + minPage).map(pageNumber => (
                <button key={pageNumber} style={currentPage === pageNumber ? {backgroundColor: 'lightgreen'} : {}} onClick={() => setCurrentPage(pageNumber)}>
                    {pageNumber}
                </button>
            ))}
            <button onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))} disabled={currentPage === totalPages}>Next</button>
        </div>
    </>
  )
}

export default Articles