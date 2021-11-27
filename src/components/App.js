import "../App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import apiKey from "../config";
import axios from "axios";
import { Component } from "react";

// Components
//=====================
import SearchForm from "./SearchForm";
import Nav from "./Nav";
import PhotoContainer from "./PhotoContainer";
import PageNotFound from "./NotFound";
//=====================
class App extends Component {
  state = {
    data: {},
    tag: "",
    isLoading: true,
  };
  navTags = ["cats", "dogs", "computers"];

   componentDidMount() {
     this.navTags.forEach(tag => this.onSearch(tag) )
   }

   onSearch = (tag) => {
    this.setState({ tag, isLoading: true });
    axios
      .get(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${tag}&per_page=24&format=json&nojsoncallback=1`
      )
      .then((res) => {
        this.setState(prevState => ({
          data: {...prevState.data, [tag]: res.data.photos.photo },
          isLoading: false,
        }));
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
              exact path="/cats"
              render={() => <PhotoContainer  data={this.state.data.cats} />}
            />
            <Route
              exact path="/dogs"
              render={() => <PhotoContainer data={this.state.data.dogs} />}
            />
            <Route
              exact path="/computers"
              render={() => <PhotoContainer data={this.state.data.computers} />}
            />
            <Route
              exact path="/search/:tag"
              render={({ match }) => <PhotoContainer searchTag={match.params.tag} data={this.state.data[match.params.tag]} onSearch={this.onSearch} />}
            />
            <Route component={PageNotFound} />

          </Switch>
        )}
      </div>
    );
  }
}

export default App;
