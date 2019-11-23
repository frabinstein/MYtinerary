import React from 'react';
import '../styles/App.css';
import { CarouselCaption } from 'reactstrap';


class GridCell extends React.Component {
  render() {
    return (
      <div className="gridCell" key={this.props.key}>
        <img src={this.props.src} alt={this.props.alt} id={this.props.id}/>
        <p>{this.props.captionText}</p>
      </div>
    );
  }
}

export default GridCell;
