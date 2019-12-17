import React from 'react';
import '../styles/App.css';


class GridCell extends React.Component {
  render() {
    return (
      <div className="gridCell">
        <img src={this.props.src} alt={this.props.alt} id={this.props.id}/>
        <p>{this.props.captionText}</p>
      </div>
    );
  }
}

export default GridCell;
