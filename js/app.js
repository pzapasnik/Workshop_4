$(document).ready(function(){
    var rootDiv = $('#root');
// zad 3
    refreshBooks(rootDiv);
    handleForm();
    // zad 4
    rootDiv.on('click', '.book', function(){
        var bookDiv = $(this);
        var detailDiv = bookDiv.find('div');
        var bookId = $(this).data('id');

        $.ajax({
            url:'http://localhost:8282/books/' + bookId,
            type: 'GET'
        }).done(function(bookDetails){
            detailDiv.toggle();
            detailDiv.text('Author: ' + bookDetails.author + ', id: ' + bookDetails.id + ', isbn: ' + bookDetails.isbn + ', publisher ' + bookDetails.publisher + ', type' + bookDetails.type);
        })
    })
    rootDiv.on('click', '.delete-button', function(e){
        e.stopPropagation();
        var bookId = $(this).parent().data('id');
        $.ajax({
            url:'http://localhost:8282/books/' + bookId,
            type: 'DELETE'
        }).done(function(){
            refreshBooks(rootDiv);
        })
    })

});

function handleForm() {
    var form = $('.new_book');
    var submit = form.find('#add-button');
    submit.on('click', function(e){
        e.preventDefault();
        
        var newBook = {};

        newBook.author = $('#author').val();
        newBook.isbn = $('#isbn').val();
        newBook.publisher = $('#publisher').val();
        newBook.title = $('#title').val();
        newBook.type = $('#type').val();
        
        $.ajax({
            url: 'http://localhost:8282/books/',
            type: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(newBook)
        }).done(function(){
            refreshBooks($('#root'));
        })
    })

}
// zad 3
function refreshBooks(rootElement) {
    rootElement.html('');
    $.ajax({
        url: 'http://localhost:8282/books/',
        type: 'GET'
    }).done(function(data){
        for (var i = 0; i < data.length; i++) {
            var newTag = $('<div class="book" data-id="' + data[i].id +'">' + data[i].title +'<button class="delete-button">Usun</button>' + '<div style=display:none;></div></div>');
            rootElement.append(newTag);
        }
    })
}