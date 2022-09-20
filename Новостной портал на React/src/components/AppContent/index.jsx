import React from "react";
import { Route, Switch, Redirect} from "react-router";

import MainPage, {routeMain as routeMainPage} from "../../pages/MainPage";
import Contacts, {routeMain as routeContacts} from "../../pages/Contacts";
import NewsListPage, {routeMain as routeNewsList} from "../../pages/NewsListPage";
import NewsDetail, {routeMain as routeNewsDetail} from "../../pages/NewsDetail";

import './style.scss';
import Header from "../Header";
import Footer from "../Footer";


const AppContent = () => {
  return (
    <div className="mainWrapper">
      <Header/>
      <main>
        <Switch>
          <Route exact path={routeMainPage()} component={MainPage}/>
          <Route exact path={routeContacts()} component={Contacts}/>
          <Route exact path={routeNewsList()} component={NewsListPage}/>
          <Route exact path={routeNewsDetail()} component={NewsDetail}/>
          <Redirect
            to = {{
              pathname: routeMainPage()
            }}
          />
        </Switch>
      </main>
      <Footer/>
    </div>
  );
}

export default AppContent;
