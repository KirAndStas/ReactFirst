import React from 'react';

var FilmShort = React.createClass({

  handleClick: function(show, id) {
    var newShow = !show;
    var iD = id;
    this.props.onClick(newShow, iD);
  },

  render: function() {
    var filmArray = this.props.filmInArray.film;
    return (
        <button style={{marginBottom:'15px'}} type="button" className="btn btn-info btn-block" onClick={this.handleClick.bind(null, filmArray.Show, filmArray.id)}>{filmArray.id}. {filmArray.title}</button>
    )
  }
});

module.exports = FilmShort;
