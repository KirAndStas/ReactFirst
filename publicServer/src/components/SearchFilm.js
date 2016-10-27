import React from 'react';

var SearchFilm = React.createClass({
  handleChange: function(e) {
    var searcH = e.target.value
    this.props.onChange(searcH);
  },
  handleCheckChange: function(e) {
    var val = e.target.checked;
    var id = e.target.id;
    this.props.onCheckChange(id, val)
  },

  render: function() {
    return (
        <div style={{marginBottom:'20px'}}>
          <input onChange={this.handleChange} type="text" className="form-control" id="firstname" name="firstname" placeholder="Search"/>
          <label className="checkbox-inline"><input onChange={this.handleCheckChange} type="checkbox" id="ByTitle" checked={this.props.ByTitle}/> By Film Title</label>
          <label className="checkbox-inline"><input onChange={this.handleCheckChange} type="checkbox" id="ByStars" checked={this.props.ByStars}/> By Stars</label>
        </div>
    )
  }
})

module.exports = SearchFilm;
