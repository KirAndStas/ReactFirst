import React from 'react';

var iAmForm = React.createClass({
  submitNewFilm: function(e) {
    e.target.value = e.target.placeholder;
    e.preventDefault();
    this.props.onClick();
  },

  handleChange: function(event) {
    this.props.onChange(event);

  },
  render: function() {
    return (
      <div className="row row-content">
          <div className="col-xs-12 col-sm-11">
              <form className="form-horizontal" role="form" onChange={this.handleChange}>
                  <div className="form-group">
                      <label htmlFor="firstname" className="col-sm-2 control-label">Title</label>
                      <div className="col-sm-10">
                      <input value={this.props.getInit.title} type="text" className="form-control" id="title" name="title" placeholder="Enter Film Title"/>
                      </div>
                  </div>
                  <div className="form-group">
                      <label htmlFor="lastname" className="col-sm-2 control-label">Year</label>
                      <div className="col-sm-10">
                          <input value={this.props.getInit.year} type="text" className="form-control" id="year" name="year" placeholder="Enter Film Year"/>
                      </div>
                  </div>

                  <div className="form-group">
                      <label htmlFor="quality" className="col-sm-2 control-label">Quality</label>
                      <div className="col-sm-10">
                          <input value={this.props.getInit.quality} type="text" className="form-control" id="quality" name="quality" placeholder="Quality"/>
                      </div>
                  </div>

                  <div className="form-group">
                      <label htmlFor="stars" className="col-sm-2 control-label">Stars</label>
                      <div className="col-sm-10">
                          <textarea value={this.props.getInit.stars} className="form-control" id="stars" name="stars" rows="8"></textarea>
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
