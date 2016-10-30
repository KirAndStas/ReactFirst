var React = require('react')

var FilmLoad = React.createClass({
  onChangeHandle: function(e) {
    this.props.filE(e);
  },
  onClickHandle: function() {
    this.props.clicK();
  },
  render: function() {
    return (
      <div className="row row-content">
        <div className="col-xs-12 col-sm-11">
          <h4>{this.props.heaD}</h4>
          <form className="form-horizontal" role="form">
              <div className="form-group">
                  <label htmlFor="firstname" className="col-sm-2 control-label">{this.props.labeL}</label>
                  <div className="col-sm-10">
                  <input type="file" onChange={this.onChangeHandle} className="form-control" id="title" name="title" placeholder="Enter Film Title"/>
                  </div>
              </div>
              <div className="form-group">
                  <div className="col-sm-offset-2 col-sm-10">
                      <button type="submit" onClick={this.onClickHandle} className="btn btn-default">Add Film</button>
                  </div>
              </div>
          </form>
        </div>
      </div>
    )
  }
})

module.exports = FilmLoad;
