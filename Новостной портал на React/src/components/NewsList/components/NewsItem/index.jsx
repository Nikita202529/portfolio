import React from 'react';
import './style.scss';
import DateView from '../../../DateView';
import { NavLink } from "react-router-dom";
// import {routeMain as routeNewsDetail} from "../../pages/NewsDetail";  
import {routeMain as routeNewsDetail} from "../../../../pages/NewsDetail";  

const NewsItem = (props) => {

    return (
    <NavLink className="newsItem" to={routeNewsDetail(props.item._id)}>
        <div className="title">
            {props.item.title}
        </div>
        <div className="bottomWrapper">
            <p className='source'>{props.item.clean_url}</p>
            <DateView value = {props.item.published_date} />
        </div>
    </NavLink>
    )
    
}

export default NewsItem;