import React from 'react';
import FileInput from 'react-file-input';

var IchBinForm = require('./IchBinForm'),
    SortFilms = require('./SortFilms'),
    SearchFilm = require('./SearchFilm'),
    FilmShort = require('./FilmShort'),
    FilmLong = require('./FilmLong'),
    FilmLoad = require('./FilmLoad')


var App = React.createClass({

  getInitialState: function() {
    return {
      list: [],
      newFilm: {title: "", year: "", quality: "", stars: "", Show : true },
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
      if (this.state.list[film]._id == filmId) {
        var toChan = this.state.list[film]._id;
        var howChan = newShow;
      }
    };

    //console.log(toChan);
    //console.log(howChan);

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
        //console.log(responseJson);
        thisInsideApp.setState({
          list: responseJson
        })
      });
  },

  deleteFilm: function(id) {
    var thisInsideApp = this;
    for (var film=0; film < this.state.list.length; film++) {
      if (this.state.list[film]._id == id) {
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
        //console.log(responseJson);
        thisInsideApp.setState({
          list: responseJson
        })
      });
  },

  seeForChangeInForm: function(event) {
    var whatIsDiff = event.target.value;
    var whereIsDiff = event.target.id;

    if (whereIsDiff == 'title') {
      var whatChange = {
        title: whatIsDiff,
        year: this.state.newFilm.year,
        quality: this.state.newFilm.quality,
        stars: this.state.newFilm.stars,
        Show: this.state.newFilm.Show
      }
    }
    else if (whereIsDiff == 'year') {
      var whatChange = {
        title: this.state.newFilm.title,
        year: whatIsDiff,
        quality: this.state.newFilm.quality,
        stars: this.state.newFilm.stars,
        Show: this.state.newFilm.Show
      }
    }
    else if (whereIsDiff == 'quality') {
      var whatChange = {
        title: this.state.newFilm.title,
        year: this.state.newFilm.year,
        quality: whatIsDiff,
        stars: this.state.newFilm.stars,
        Show: this.state.newFilm.Show
      }
    }
    else if (whereIsDiff == 'stars') {
      var whatChange = {
        title: this.state.newFilm.title,
        year: this.state.newFilm.year,
        quality: this.state.newFilm.quality,
        stars: whatIsDiff,
        Show: this.state.newFilm.Show
      }
    }
    this.setState({newFilm:whatChange})
  },

  addNewFilm: function() {
    var thisInsideApp = this;
    var filmToList = this.state.newFilm
    var findForEqual = function(film, filmsToCheck) {
      var back = true;
      for (var e = 0; e<filmsToCheck.length; e++) {
        if (film.title == filmsToCheck[e].film.title) {
          var back = false;
          break;
        }
      }
      return back
    };

    if (findForEqual(filmToList, thisInsideApp.state.list)) {
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
        //console.log(responseJson);
        thisInsideApp.setState({
          list: responseJson
        })
      });
      var newFilm = {title: "", year: "", quality: "", stars: "", Show : true };
      this.setState({
        newFilm: newFilm
      });
    } else {
      alert('Hey, bad guy. Do you think I am so stupid ?');
    }

    //console.log(filmToList);
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

  FilmFileLoad: function(event) {
    var thisInsideApp = this;
    var file = event.target.files[0];

    var reader = new FileReader();
    reader.onload = function(progressEvent){
      // Entire file
      var texT = this.result;
      var texTarr = texT.split('\n\n');
      var FilmArr = []
      var findForEqual = function(film, filmsToCheck) {
        var back = true;
        for (var e = 0; e<filmsToCheck.length; e++) {
          if (film.title == filmsToCheck[e].film.title) {
            var back = false;
            break;
          }
        }
        return back
      };

      for (var e = 0; e<texTarr.length; e++) {
        if (texTarr[e].substr(0, 5) == 'Title') {
          var texTarrElem = texTarr[e];
          var texTarrElemByItem = texTarrElem.split('\n');
          var texTarrElemByItemObject = {
            title: texTarrElemByItem[0].substr(7),
            year: texTarrElemByItem[1].substr(14),
            quality: texTarrElemByItem[2].substr(8),
            stars: texTarrElemByItem[3].substr(7),
            Show : true };
          findForEqual(texTarrElemByItemObject, thisInsideApp.state.list);
          if (findForEqual(texTarrElemByItemObject, thisInsideApp.state.list)) {
            FilmArr.push(texTarrElemByItemObject)
          }
        }
      }

      //console.log(FilmArr);

      fetch('/filmload', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            film: FilmArr
          })
        })
        .then(function(response) {
          return response.json()
        })
        .then(function(responseJson) {
          thisInsideApp.setState({
            list: responseJson
          });
        })
    };
    reader.readAsText(file);
  },

  FilmFileLoadClick: function() {
  },

  render: function() {

    let filterList = this.state.list.filter((film) => {
      if (this.state.searchDetails.ByTitle == true) {
        return film.film.title.toLowerCase().indexOf(this.state.searchWord.toLowerCase()) !== -1
      } else {
        return film.film.stars.toLowerCase().indexOf(this.state.searchWord.toLowerCase()) !== -1
      }
      var Id = indexOf(film)
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
                <div key={film._id}>
                {film.film.Show ? <FilmLong onDeleteClick={this.deleteFilm} onShowClick={this.changeShow} filmInArray={film}/>:<FilmShort onClick={this.changeShow} filmInArray={film}/>}
                </div>
              )}</ul>
             </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <IchBinForm onChange={this.seeForChangeInForm} onClick={this.addNewFilm} getInit={this.state.newFilm}/>

          <FilmLoad heaD='Here you can add your films within text file' labeL='File' clicK={this.FilmFileLoadClick} filE={this.FilmFileLoad}/>
        </div>
      </div>
    );
  }
});

module.exports = App;
