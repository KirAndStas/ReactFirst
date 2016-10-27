import React from 'react';

var IchBinForm = require('./IchBinForm');
var SortFilms = require('./SortFilms');
var SearchFilm = require('./SearchFilm');
var FilmShort = require('./FilmShort.js');
var FilmLong = require('./FilmLong.js');

var App = React.createClass({

  getInitialState: function() {
    return {
      list: [],
      newFilm: {id: "", title: "", year: "", quality: "", stars: "", Show : true },
      searchWord: '',
      searchDetails : {ByTitle: true, ByStars: false }
    }
  },

  componentWillMount: function(){
    var thisInsideApp = this;
    fetch('/filmList', {method: 'GET'})
    .then(function(response) {
      return response.json()
    })
    .then(function(responseJson) {
      thisInsideApp.setState({
        list: responseJson
      });
    })
  },

  componentDidMount: function() {

  },

  changeShow: function(newShow, filmId) {

    var thisInsideApp = this;
    for (var film=0; film < this.state.list.length; film++) {
      if (this.state.list[film].film.id == filmId) {
        var toChan = this.state.list[film]._id;
        var howChan = newShow;
      }
    };

    console.log(toChan);
    console.log(howChan);

    fetch('/filmList', {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          _id: toChan,
          newShow: howChan
        })
      })
      .then(function(response) {
        return response.json()
      })
      .then(function(responseJson) {
        console.log(responseJson);
        thisInsideApp.setState({
          list: responseJson
        })
      });
  },

  deleteFilm: function(id) {
    var thisInsideApp = this;
    for (var film=0; film < this.state.list.length; film++) {
      if (this.state.list[film].film.id == id) {
        var toDel = this.state.list[film]._id
      }
    };
    fetch('/filmList', {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          _id: toDel
        })
      })
      .then(function(response) {
        return response.json()
      })
      .then(function(responseJson) {
        console.log(responseJson);
        thisInsideApp.setState({
          list: responseJson
        })
      });
  },

  seeForChangeInForm: function(change, id) {
    var newId = this.state.list.length + 1

    if (id == 'title') {
      var whatChange = {
        id: newId,
        title: change,
        year: this.state.newFilm.year,
        quality: this.state.newFilm.quality,
        stars: this.state.newFilm.stars,
        Show: this.state.newFilm.Show
      }
    }
    else if (id == 'year') {
      var whatChange = {
        id: newId,
        title: this.state.newFilm.title,
        year: change,
        quality: this.state.newFilm.quality,
        stars: this.state.newFilm.stars,
        Show: this.state.newFilm.Show
      }
    }
    else if (id == 'quality') {
      var whatChange = {
        id: newId,
        title: this.state.newFilm.title,
        year: this.state.newFilm.year,
        quality: change,
        stars: this.state.newFilm.stars,
        Show: this.state.newFilm.Show
      }
    }
    else if (id == 'stars') {
      var whatChange = {
        id: newId,
        title: this.state.newFilm.title,
        year: this.state.newFilm.year,
        quality: this.state.newFilm.quality,
        stars: change,
        Show: this.state.newFilm.Show
      }
    }
    this.setState({newFilm:whatChange})
    //alert(this.state.newFilm.id)
  },

  addNewFilm: function() {
    var thisInsideApp = this;
    var newList = this.state.list.push(this.state.newFilm);
    var filmToList = this.state.newFilm
    console.log(filmToList)
    fetch('/filmList', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          film: filmToList
        })
      })
    .then(function(response) {
      return response.json()
    })
    .then(function(responseJson) {
      console.log(responseJson);
      thisInsideApp.setState({
        list: responseJson
      })
    });
  },

  sortMe:function() {
    var titleForSort = [];
    var howSort = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (var film=0; film<this.state.list.length; film++) {
      titleForSort.push(this.state.list[film].film.title)
    }

    var title = 0;
    while(title < titleForSort.length) {
      if (title == titleForSort.length - 1) {
        break
      } else {
        var firstTitle = titleForSort[title];
        var secondTitle= titleForSort[title + 1];
        var value1 = howSort.indexOf(firstTitle[0]);
        var value2 = howSort.indexOf(secondTitle[0]);

        if (value1>value2) {
          titleForSort.splice(title, 1, secondTitle);
          titleForSort.splice(title + 1, 1, firstTitle);
          var title = 0;
        }
        else if (value1<=value2) {
          title++
        }
        else {alert('I dont work in comparing values')}
      }
    };
    var sortedList = [];
    for (var title=0; title<titleForSort.length; title++) {
      for (var tit = 0; tit<this.state.list.length; tit++){
        if (titleForSort[title] == this.state.list[tit].film.title) {
          sortedList.push(this.state.list[tit]);
        }
      }
    }

    this.setState({list:sortedList})
  },

  searchMe: function(searchWord) {
    this.setState({searchWord:searchWord})
  },

  howSearch:function(whichCheckBox, val) {

    if (whichCheckBox == 'ByTitle') {
      var newSearchDetails = {
        ByTitle: val,
        ByStars: !val
      };
    } else if (whichCheckBox == 'ByStars') {
      var newSearchDetails = {
        ByTitle: !val,
        ByStars: val
      };
    }

    this.setState({searchDetails:newSearchDetails});
  },

  render: function() {

    let filterList = this.state.list.filter((film) => {
      if (this.state.searchDetails.ByTitle == true) {
        return film.film.title.toLowerCase().indexOf(this.state.searchWord.toLowerCase()) !== -1
      } else {
        return film.film.stars.toLowerCase().indexOf(this.state.searchWord.toLowerCase()) !== -1
      }

    });

    return (
      <div className="row">
        <h1 style={{textAlign:'center'}}>Hi, my name is Cir. I am 19, from Kiev, Ukraine.</h1>
        <div className="col-md-8">
          <div>
            <div className="row">
              <div className="col-md-9" style={{marginLeft:'40px'}}>
                <SearchFilm ByTitle={this.state.searchDetails.ByTitle} ByStars={this.state.searchDetails.ByStars} onChange={this.searchMe} onCheckChange={this.howSearch}/>
              </div>
              <div className="col-md-2" style={{float: 'right'}} >
                <SortFilms Sort={this.sortMe}/>
              </div>
            </div>
            <div className="row">
             <div className="col-md-12">
              <ul>{filterList.map((film) =>
                <div key={film.film.id}>
                {film.film.Show ? <FilmLong onDeleteClick={this.deleteFilm} onShowClick={this.changeShow} filmInArray={film}/>:<FilmShort onClick={this.changeShow} filmInArray={film}/>}
                </div>
              )}</ul>
             </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <IchBinForm onChange={this.seeForChangeInForm} onClick={this.addNewFilm}/>
        </div>
      </div>
    );
  }
});

module.exports = App;
