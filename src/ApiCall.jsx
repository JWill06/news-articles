const FetchNews = async() => {
    try {
        const res = await fetch('https://newsapi.org/v2/everything?q=Apple&from=2024-07-10&sortBy=popularity&apiKey=0a88f1e8d3f94c04b29a691c09005e02')
        if(!res.ok){
            throw new Error(`Error at grabbing articles ${res.status}`)
        }
       const data = await res.json()
       return data.articles
    } catch (error){
        console.error('Failed to get articles', error)
        throw error
    }
}

export default FetchNews