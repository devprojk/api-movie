function dataMovie() {
  $('#daftar-movie').html('')

  $.ajax({
    type: 'get' ,
    url: 'http://omdbapi.com' ,
    dataType: 'json' ,
    data: {
      'apikey': 'dca61bcc',
      's': $('#search-input').val()
    },
    success: function (result) {
      if (result.Response == "True") {
        let movies = result.Search

        $.each(movies, function (i, data) {
          $('#daftar-movie').append(`
            <div class="col-md-4">
              <div class="card mb-3 shadow">
                <img src="${data.Poster}" class="card-img-top" height="470">
                <div class="card-body">
                  <h5 class="card-title">${data.Title}</h5>
                  <h6 class="card-subtitle mb-2 text-muted">${data.Year}</h6>
                  <a class="card-link see-detail" data-id="${data.imdbID}" data-bs-toggle="modal" data-bs-target="#staticBackdrop">See Detail</a>
                </div>
              </div>
            </div>
          `)
        })
      } else {
        $('#daftar-movie').html(`
            <div class="col">
              <h1 class="text-center" style="color: grey;">${result.Error}</h1>
            </div>
          `)
      }
      
    }
  })

  $('#search-input').val('')
}

$('#search-button').on('click', function () {
  dataMovie();
})

$('#search-input').on('keyup', function (e) {
  if (e.keyCode === 13) {
    dataMovie();
  }
})

$('#daftar-movie').on('click', '.see-detail', function () {

  $.ajax({
    type: 'get' ,
    url: 'http://omdbapi.com' ,
    dataType: 'json' ,
    data: {
      'apikey': 'dca61bcc',
      'i': $(this).data('id')
    },
    success: function (movie) {
      if (movie.Response === "True") {
        
          $('.modal-body').html(`
            <div class="container-fluid">
              <div class="row">
                <div class="col-sm-6">
                  <img src="${movie.Poster}"> 
                </div>
                <div class="col-sm-6">
                  <h1><b>Title:</b> ${movie.Title}</h1>
                  <h5><b>Release:</b> ${movie.Released}</h5>
                  <h5><b>Runtime:</b> ${movie.Runtime}</h5>
                  <h5><b>Genre:</b> ${movie.Genre}</h5>
                  <h5><b>Writer:</b> ${movie.Writer}</h5>
                  <h5><b>Actor:</b> ${movie.Actors}</h5>
                </div>
              </div>
            </div>
          `)

      } else {
        
      }
      
    }
  })
})
