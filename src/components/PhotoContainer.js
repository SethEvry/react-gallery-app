import Photo from "./Photo";
import React, { Component } from "react";
import NotFound from "./NotFound";

class PhotoContainer extends Component {

  //If data[tag] doesn't exists in App, searches for it and updates the state
  componentDidMount() {
    //makes sure the props exist before attempting to use them aswell
    if (!this.props.data && this.props.onSearch) {
      this.props.onSearch(this.props.searchTag);
    }
  }
  render() {
    let photos;
    if (this.props.data) {
      if (this.props.data.length > 0) {
        photos = this.props.data.map((photo) => {
          return (
            <Photo
              key={photo.id}
              url={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_c.jpg`}
              title={photo.title}
            />
          );
        });
      } else {
        photos = <NotFound />;
      }
    }

    return (
      <div className="photo-container">
      {/* Makes sure the data props exists and then if there are results, generates the h2 element */}
      {this.props.data && this.props.data.length > 0 ? <h2>Results</h2> : null}
        <ul>{photos}</ul>
      </div>
    );
  }
}

export default PhotoContainer;
