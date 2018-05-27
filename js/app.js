$(document).ready(function(){
    var rootDiv = $('#root');
// zad 3
    $.ajax({
        url: 'http://localhost:8282/books/',
        type: 'GET'
    }).done(function(data){
        for (var i = 0; i < data.length; i++) {
            var newTag = $('<div class="book" data-id="' + data[i].id +'">' + data[i].title + '<div style=display:none;></div></div>');
            rootDiv.append(newTag);
        }
    })
    // zad 4
    rootDiv.on('click', '.book', function(){
        var bookDiv = $(this);
        var detailDiv = bookDiv.find('div');
        var bookId = $(this).data('id');

        $.ajax({
            url:'http://localhost:8282/books/' + bookId,
            type: 'GET'
        }).done(function(bookDetails){
            detailDiv.show();
            detailDiv.text('Author: ' + bookDetails.author + ', id: ' + bookDetails.id + ', isbn: ' + bookDetails.isbn + ', publisher ' + bookDetails.publisher + ', type' + bookDetails.type);
        })
    })
});