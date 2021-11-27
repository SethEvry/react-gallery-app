import "../App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import apiKey from "../config";
import axios from "axios";
import React, { Component } from "react";

// Components
//=====================
import SearchForm from "./SearchForm";
import Nav from "./Nav";
import PhotoContainer from "./PhotoContainer";
import PageNotFound from "./PageNotFound";
//=====================
class App extends Component {
  state = {
    data: {},
    tag: "",
    isLoading: true,
  };
  navTags = ["cats", "dogs", "computers"];

  //Generates a data set for each nav tag
  componentDidMount() {
    this.navTags.forEach((tag) => this.onSearch(tag));
  }

  onSearch = (tag) => {
    this.setState({ tag, isLoading: true });
    axios
      .get(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${tag}&per_page=24&format=json&nojsoncallback=1`
      )
      .then((res) => {
        const photos = res.data.photos.photo;
        if (photos.length >= 1) {
          this.setState((prevState) => ({
            data: { ...prevState.data, [tag]: photos },
            isLoading: false,
          }));
        } else {
          this.setState((prevState) => ({
            data: { ...prevState.data, [tag]: [] },
            isLoading: false,
          }));
        }
      })
      .catch((err) => {
        console.log("Error fetching and parsing data!", err);
      });
  };
  render() {
    return (
      <div className="Container">
        <SearchForm onSearch={this.onSearch} />
        <Nav tags={this.navTags} />
        {this.state.isLoading ? (
          <p>Loading...</p>
        ) : (
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/cats" />} />
            <Route
              exact
              path="/cats"
              render={() => <PhotoContainer title="Cats" data={this.state.data.cats} />}
            />
            <Route
              exact
              path="/dogs"
              render={() => <PhotoContainer title="Dogs" data={this.state.data.dogs} />}
            />
            <Route
              exact
              path="/computers"
              render={() => <PhotoContainer title="Computers" data={this.state.data.computers} />}
            />
            <Route
              exact
              path="/search/:tag"
              render={({ match }) => (
                <PhotoContainer
                  title={match.params.tag}
                  searchTag={match.params.tag}
                  data={this.state.data[match.params.tag]}
                  onSearch={this.onSearch}
                />
              )}
            />
            <Route component={PageNotFound} />
          </Switch>
        )}
      </div>
    );
  }
}

export default App;
