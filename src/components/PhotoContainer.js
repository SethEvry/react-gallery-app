import Photo from "./Photo";
import { Component } from "react";
import  NotFound  from "./NotFound";

class PhotoContainer extends Component {
  // https://live.staticflickr.com/{server-id}/{id}_{secret}_{size-suffix}.jpg

  componentDidMount() {
    if(!this.props.data){
      this.props.onSearch(this.props.searchTag)
    }
  }
  render() {
    let photos;
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
      photos = (
        <NotFound />
      );
    }

    return (
      <div className="photo-container">
        <ul>{photos}</ul>
      </div>
    );
  }
}

export default PhotoContainer;
