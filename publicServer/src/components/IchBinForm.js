import React from 'react';

var iAmForm = React.createClass({
  submitNewFilm: function(e) {
    e.target.value = e.target.placeholder;
    e.preventDefault();
    this.props.onClick();
  },

  handleChange: function(e) {
    var whatIsDiff = e.target.value;
    var whereIsDiff = e.target.id;
    this.props.onChange(whatIsDiff, whereIsDiff);

  },
  render: function() {
    return (
      <div className="row row-content">
          <div className="col-xs-12 col-sm-11">
              <form className="form-horizontal" role="form" onChange={this.handleChange}>
                  <div className="form-group">
                      <label htmlFor="firstname" className="col-sm-2 control-label">Title</label>
                      <div className="col-sm-10">
                      <input type="text" className="form-control" id="title" name="title" placeholder="Enter Film Title"/>
                      </div>
                  </div>
                  <div className="form-group">
                      <label htmlFor="lastname" className="col-sm-2 control-label">Year</label>
                      <div className="col-sm-10">
                          <input type="text" className="form-control" id="year" name="year" placeholder="Enter Film Year"/>
                      </div>
                  </div>

                  <div className="form-group">
                      <label htmlFor="emailid" className="col-sm-2 control-label">Quality</label>
                      <div className="col-sm-10">
                          <input type="text" className="form-control" id="quality" name="quality" placeholder="Quality"/>
                      </div>
                  </div>

                  <div className="form-group">
                      <label htmlFor="feedback" className="col-sm-2 control-label">Stars</label>
                      <div className="col-sm-10">
                          <textarea className="form-control" id="stars" name="stars" rows="12"></textarea>
                      </div>
                  </div>
                  <div className="form-group">
                      <div className="col-sm-offset-2 col-sm-10">
                          <button type="submit" className="btn btn-primary" onClick={this.submitNewFilm}>Add Film</button>
                      </div>
                  </div>
              </form>
          </div>

     </div>
    )
  }
})

module.exports = iAmForm;
