const myLibrary = [];
const body = document.querySelector("body");

function Book(title, author, pages, genre, read = "Unread") {
    this.Title = title;
    this.Author = author;
    this.Pages = pages;
    this.Genre = genre;
    this.Status = read;
}

Book.prototype.switchStatus = function(){
    if (this.Status == "Unread") {
        this.Status = "Read";
    } else if (this.Status == "Read") {
        this.Status = "Unread";
    }
}

Book.prototype.oppositeStatus = function() {
    if (this.Status == "Unread") {
        return "Read";
    } else if (this.Status == "Read") {
        return "Unread";
    }
}

function addBookToLibrary(title, author, pages, genre, library) {
    let book = new Book(title, author, pages, genre);
    library.push(book);
}

function createDiv() {
    return document.createElement("div");
}

function createParagraph() {
    return document.createElement("p");
}

function createButton(type, textContent) {

    let button = document.createElement("button");
    button.setAttribute("type", type);
    button.textContent = textContent;
    return button;
}

function createInput(type, fieldLabel) {

    let element = createDiv();
    let label = document.createElement("label");
    label.setAttribute("for", fieldLabel);

    let input = document.createElement("input")
    input.setAttribute("type", type);
    input.setAttribute("id", fieldLabel);

    label.textContent = fieldLabel;
    element.appendChild(label);
    element.appendChild(input);
    
    return element;
    
}

function appendChildrenToParents(parents, children) {
    //Appends children to parent elements

    for (let parent = 0; parent < parents.length; parent++) {
        for (let child = 0; child < children[parent].length; child++) {
            parents[parent].appendChild(children[parent][child]);
        }
    }
}

// function setAllAttribute(element, attributes) {
//     for(let attribute in attributes) {
//         element.setAttribute(attribute, attributes[attributes])
//     }
// }

function createLibrary(library) {

    let container = createDiv();

    for (let i = 0; i < library.length; i++) {

        let buttonsDiv = createDiv();
        let bookDiv = createDiv();
        let deleteButton = createButton("button", "Delete book");
        let setStatusButton = createButton("button", `Set to ${library[i].oppositeStatus()}`);
        bookDiv.setAttribute("class", "books")

        deleteButton.addEventListener("click", function() {
            container.removeChild(bookDiv);
            myLibrary.splice(i, 1);
            updateLibrary(myLibrary);
        })

        setStatusButton.addEventListener("click", function() {
            library[i].switchStatus();
            updateLibrary(myLibrary);
        })

        buttonsDiv.appendChild(setStatusButton);

        for (let prop in library[i]) {

            if(library[i].hasOwnProperty(prop)) {
                let p = createParagraph();
                p.setAttribute("class", prop.toString());
                if(!(prop === "Status")) {
                    p.textContent += `${prop}: ${library[i][prop]}`;
                } else {
                    p.textContent += `${library[i]["Status"]}`;
                }
                
                bookDiv.appendChild(p);
            }
            
        }
        buttonsDiv.appendChild(deleteButton);
        buttonsDiv.setAttribute("class", "booksButtons");
        bookDiv.appendChild(buttonsDiv);
        container.appendChild(bookDiv);
        
    }
    return container;
}

function updateLibrary(newLibrary) {
    let newLibraryDiv = createLibrary(newLibrary);
    newLibraryDiv.setAttribute("id", "library");
    let oldLibraryDiv = document.getElementById("library");
    body.replaceChild(newLibraryDiv, oldLibraryDiv);
}

function dialogBox() {
    // creates a barebones dialog box with open and close buttons and returns a div

    let container = createDiv();
    container.setAttribute("class", "dialog_box");
    let inputFields = createDiv();

    let openButton = createButton("button", "Add new book");
    let closeButton = createButton("button", "X");
    let submitButton = createButton("button", "Submit");

    let dialog = document.createElement("dialog");
    let titleField = createInput("text", "Title");
    let authorField = createInput("text", "Author");
    let pageField = createInput("number", "Pages");
    let genreField = createInput("text", "Genre");

    openButton.addEventListener("click", function() {
        dialog.showModal();
    });

    closeButton.addEventListener("click", function() {
        dialog.close()
    })

    submitButton.addEventListener("click", function() {
        let currentTitle = document.getElementById("Title").value;
        let currentAuthor = document.getElementById("Author").value;
        let currentPages = document.getElementById("Pages").value;
        let currentGenre = document.getElementById("Genre").value;

        addBookToLibrary(currentTitle, currentAuthor, currentPages, currentGenre, myLibrary);
        updateLibrary(myLibrary);
        dialog.close();
    })

    let parents = [inputFields, dialog, container]
    let children1 = [closeButton, titleField, authorField, pageField, genreField, submitButton];
    let children2 = [inputFields];
    let children3 = [openButton, dialog];

    appendChildrenToParents(parents, [children1, children2, children3]);

    return container;
}

addBookToLibrary("Harry Potter and the Goblet of Fire", "J.K. Rowling", 300, "Fiction", myLibrary); // creates book
addBookToLibrary("Hunger Games", "Suzanne Collins", 350, "Fiction", myLibrary);
addBookToLibrary("The Subtle Art of Not Giving a F*ck", "Mark Manson", 150, "Non-fiction", myLibrary);
addBookToLibrary("Thermodynamics", "Friedman", 500, "Non-fiction", myLibrary);

let libraryDiv = createLibrary(myLibrary);
libraryDiv.setAttribute("id", "library");

let addNewBookPrompt = dialogBox();

body.append(addNewBookPrompt);
body.append(libraryDiv);


