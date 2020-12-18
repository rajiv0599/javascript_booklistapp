// book list app using javascript
//book constructor
class Book{
    constructor(title,author,isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
//All user interface functionality
class UI{
    static displayBooks(){
        const books=store.getbooks();
        
        books.forEach((book) => UI.addBookToTheList(book));
    }
    static addBookToTheList(book){
        const list = document.querySelector('#book-list');
        const row=document.createElement('tr');
        row.innerHTML=`
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</td>`
            ;
            list.appendChild(row);
            
    }
    static clearFields(){
        document.querySelector('#title').value='';
        document.querySelector('#author').value='';
        document.querySelector('#isbn').value='';
    }
    static removeBook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }
    static showalert(message,className){
        const div=document.createElement('div');
        div.className=`alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const cont=document.querySelector('.container');
        const form=document.querySelector('#book-form')
        cont.insertBefore(div,form);
        setTimeout(function() {document.querySelector('.alert').remove()},3000)
    }
}

//local storage functionality
class store{
    
    static getbooks(){
        let books;
        if (localStorage.getItem('books') === null){
            books=[];
        }
        else{
            books=JSON.parse(localStorage.getItem('books'))
        }
        return books;
    }
    static addbook(book){
        const books=store.getbooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books))
    }
    static removebook(isbn){
        const books=store.getbooks();
        books.forEach((book,index)=>{
            if (book.isbn === isbn){
                books.splice(index,1)
            }
        });
        localStorage.setItem('books',JSON.stringify(books))
    }
    static showalert(message,className){
        const div=document.createElement('div');
        div.className=`alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const cont=document.querySelector('.container');
        const form=document.querySelector('#book-form')
        cont.insertBefore(div,form);
        setTimeout(function() {document.querySelector('.alert').remove()},3000)
    }

}

//loading the list
document.addEventListener('DOMContentLoaded',UI.displayBooks)

//Event : add a book 
document.querySelector('#book-form').addEventListener('submit',(e) => {
    e.preventDefault();
    // Get form values
    const title=document.querySelector('#title').value;
    const author=document.querySelector('#author').value;
    const isbn=document.querySelector('#isbn').value;

    const book =new Book(title,author,isbn);
    console.log(book);
    //validate 
    if(title === '' || author === '' || isbn === ''){
        UI.showalert('please fill in all the required fields',"danger")
    }
    else{
        //add book to list
        UI.addBookToTheList(book);
        // add to local localStorage
        store.addbook(book);
        UI.showalert('BOOK ADDED','success')
        //clear fields

        UI.clearFields();
    }
});
//remove button event
document.querySelector('#book-list').addEventListener('click',(e)=>{
    UI.removeBook(e.target)
    store.removebook(e.target.parentElement.previousElementSibling.textContent);
    UI.showalert('book removed','success')
})

let search=document.querySelector('#input-search'),value;
