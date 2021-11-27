import Photo from "./Photo";
import React, { Component } from "react";
import NotFound from "./NotFound";

class PhotoContainer extends Component {
  // https://live.staticflickr.com/{server-id}/{id}_{secret}_{size-suffix}.jpg

  componentDidMount() {
    if (!this.props.data) {
      this.props.onSearch(this.props.searchTag);
    }
  }
  render() {
    let photos;
    if (this.props.data) {
      if (this.props.data.length > 0) {
        console.log("yay");

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
      {this.props.data && this.props.data.length > 0 ? <h2>Results</h2> : null}
        <ul>{photos}</ul>
      </div>
    );
  }
}

export default PhotoContainer;
