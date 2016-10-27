import React from 'react';

var SortFilms = React.createClass({
  SortMe:function(){
    this.props.Sort();
  },
  render: function() {
    return (
      <div>
        <h4 style={{marginTop:'-1.5px', float: 'right'}}>Sort:  <input onClick={this.SortMe} className="btn btn-primary" type="button" value="By Title"/></h4>
      </div>
    )
  }
})

module.exports = SortFilms;
