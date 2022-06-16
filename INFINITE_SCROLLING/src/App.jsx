import './App.css' ;
import InfiniteScroll from 'react-infinite-scroll-component' ;
import { useEffect, useState } from 'react' ;
import axios from 'axios' ;
import { useEffect, useState } from 'react' ;
import axios from 'axios' ;

function App() {
  const [items,setItems] = useState([]) ;
  const [more , setMore] = useState(true) ;
  const [page,setPage] = useState(2) ;
  const [loading,setLoading] = useState(false) ;
  const [error,setError] = useState(false) ;
  const [hasMore,setHasMore] = useState(true) ;
  const [hasError,setHasError] = useState(false) ;
  

  useEffect(()=> {
    const getData = async () => {
        const res = await fetch(`http://localhost:8080/data?_page=1&limit=10`) ;
        const data = await res.json() ;
        setItems(data) ;
        setLoading(false) ;
        setError(false) ;



    }
    getData() ;

  },[]) ;

  const Comments = async () => {
   const res = await fetch(`http://localhost:8080/data?_page=${page}&limit=10`) ;
   const data = await res.json() ;
   return data ;
  }
  const getMore = async () => {
    setLoading(true) ;
    setError(false) ;
    const data = await Comments() ;
    setItems([...items,...data]) ;
    setPage(page+1) ;
    setLoading(false) ;
    setError(false) ;
  }
  const handleScroll = () => {

    if(window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) {
      return ;
    }
    if(loading) {
      return ;
    }
    if(!hasMore) {
      return ;
    }
    getMore() ;
  }
  useEffect(()=> {
    window.addEventListener('scroll',handleScroll) ;
    return () => {
      window.removeEventListener('scroll',handleScroll) ;
    }
  }
  ,[]) ;
  return (
    <div className="App">
      <InfiniteScroll 
      className="infinite-scroll"
        dataLength={items.length}
        next={getMore}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{textAlign:'center'}}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {items.map((item,index)=> {
          return (
            <div key={index} className = "map-container">
              <h4>{item.title}</h4>
              <p>{item.body}</p>
            </div>
          )
        }
        )}
      </InfiniteScroll>
    </div>
  );
}



export default App ;
