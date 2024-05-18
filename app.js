
let name = document.getElementById("name");
let phone = document.getElementById("phone");
let email = document.getElementById("email");
let add = document.getElementById("add");
let update = document.getElementById("update");
let deleteButton = document.getElementById("delete");
let search = document.getElementById("search");
let list = document.getElementById("list");

let phoneBook = [];
let currentIndex = null; 

add.addEventListener("click", () => {
    let contact = {
        personName: name.value,
        personPhone: phone.value,
        personEmail: email.value
    }
    phoneBook.push(contact);
    showDetails();
    clearInputFields();
});

update.addEventListener("click", () => {
    if (currentIndex !== null) {
        phoneBook[currentIndex] = {
            personName: name.value,
            personPhone: phone.value,
            personEmail: email.value
        };
        showDetails();
        clearInputFields();
        currentIndex = null; 
    }
});

deleteButton.addEventListener("click", () => {
    if (currentIndex !== null) {
        phoneBook.splice(currentIndex, 1);
        showDetails();
        clearInputFields();
        currentIndex = null; 
    }
});

function showDetails() {
    list.innerHTML = '';
    phoneBook.forEach((item, index) => {
        let contactRow = document.createElement("div");
        contactRow.innerHTML = `
            <span>${item.personName}</span>
            <span>${item.personPhone}</span>
            <span>${item.personEmail}</span>
        `;
        contactRow.addEventListener("click", () => {
            name.value = item.personName;
            phone.value = item.personPhone;
            email.value = item.personEmail;
            currentIndex = index; 
        });
        list.appendChild(contactRow);
    });
}

function searchContact(searchText) {
    let contactFound = false;
    let existingMessage = document.getElementById("notFound");
    if (existingMessage) {
        existingMessage.remove();
    }

    phoneBook.forEach((item, index) => {
        let contactRow = list.children[index];
        let nameText = item.personName.toLowerCase();
        let phoneText = item.personPhone.toLowerCase();
        let emailText = item.personEmail.toLowerCase();
        if (nameText.includes(searchText) || phoneText.includes(searchText) || emailText.includes(searchText)) {
            contactRow.style.display = "flex";
            contactFound = true;
        } else {
            contactRow.style.display = "none";
        }
    });

    if (!contactFound) {
        let message = document.createElement("div");
        message.id = "notFound";
        message.innerText = "Contact Not Found!";
        message.style.color = "red";
        list.appendChild(message);
    }
}

search.addEventListener("input", function() {
    let searchText = this.value.toLowerCase();
    searchContact(searchText);
});

function clearInputFields() {
    name.value = "";
    phone.value = "";
    email.value = "";
}
