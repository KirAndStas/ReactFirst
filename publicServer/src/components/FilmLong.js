import React from 'react';

var FilmLong = React.createClass({

  handleShowClick: function(show, id) {
    this.props.onShowClick(!show, id);
  },

  handleDeleteClick: function(id) {
    this.props.onDeleteClick(id);
  },



  render: function() {
    var filmArray = this.props.filmInArray.film;
    return (
      <li style={{marginTop:'-2.25%'}} className="media">
        <button type="button" className="btn btn-info btn-block" onClick={this.handleShowClick.bind(null, filmArray.Show, this.props.filmInArray._id)}>{filmArray.title}</button>

        <div className="media">
          <div className="media-body">
            <p>
              <strong>Year:</strong> <span>{filmArray.year}</span>
              <button onClick={this.handleDeleteClick.bind(null, this.props.filmInArray._id)} className="btn btn-danger" style={{float: 'right'}} type="button" name="button">Delete</button>
              <br/>
              <strong>Quality:</strong> <span>{filmArray.quality}</span>
            </p>
            <p>
              <strong>Stars:</strong> {filmArray.stars}
            </p>
          </div>
        </div>
      </li>
    )
  }
});

module.exports = FilmLong;
