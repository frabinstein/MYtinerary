import React from 'react'

class Filter extends React.Component {    
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onFilterChange(e.target.value);
  }

  render() {
    return (
      <div>
        <label htmlFor="filter">Filter: </label>
        <input type="text" id="filter" 
          value={this.props.filterValue} 
          onChange={this.handleChange}/>
      </div>
    )
  }
}

export default Filter
