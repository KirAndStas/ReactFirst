import React from 'react';

var FilmShort = React.createClass({

  handleClick: function(show, id) {
    this.props.onClick(!show, id);
  },

  render: function() {
    var filmArray = this.props.filmInArray.film;
    return (
        <button style={{marginBottom:'15px'}} type="button" className="btn btn-info btn-block" onClick={this.handleClick.bind(null, filmArray.Show, this.props.filmInArray._id)}>{filmArray.title}</button>
    )
  }
});

module.exports = FilmShort;
