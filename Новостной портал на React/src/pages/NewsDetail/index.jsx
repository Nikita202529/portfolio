import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import './style.scss';
import routeMain from "./routes";
import getNews from "../../services/getNews";
import DateView from "../../components/DateView";

const NewsDetail = () => {
  const {id} = useParams();
  const [news, setNews] = useState(null);

  useEffect(() => {
    getNews().then(response => {
      setNews(response.data.articles.find(item => item._id === id));
    })
  }, [id]);

  return (
    <section className="newsDetailPage">
      {news ? (
        <div className="newsDetailWrapper">
          <div className="leftPart">
            <h2 className="title">{news.title}</h2>
            <p className="source">{news.clean_url}</p>
            <DateView value = {news.published_date}/>
          </div>
          <div className="rightPart">
            <img src={news.media} alt={news.media} />
            <p className="summary">{news.summary}</p>
          </div>
        </div>
      ) : <></>}
    </section>
  );
}

export {routeMain};

export default NewsDetail;