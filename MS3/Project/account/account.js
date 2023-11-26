import * as data from "../data.js";


document.getElementById("Sign-Out").addEventListener('click',() =>{
    window.location.href = "../login-signup/login.html"
  });

  document.querySelector('.search-left-container').addEventListener('click', function(){
    window.location.href = "../search-files/search.html";
  });
  
  document.querySelector('.tree-left-container').addEventListener('click', function(){
    window.location.href = "../tree-struct/tree.html";
  });
  
  document.querySelector('.account-left-container').addEventListener('click', function(){
    window.location.href = "../account/account.html";
  });
  
var currentUser = data.fakeUser;
document.getElementById("username").value = currentUser.username;
document.getElementById("gender").value  = currentUser.gender;
document.getElementById("dateofbirth").value  = currentUser.DOB;
constructBookList();

document.getElementById("profile-button").addEventListener("click", () => {updateProfile();});
document.getElementById("password-button").addEventListener("click",() => {updatePassword();});
document.getElementById("sort").addEventListener("change", () => {constructBookList();})

function updateProfile()
{
  currentUser.username = document.getElementById("username").value;
  currentUser.gender = document.getElementById("gender").value;
  currentUser.DOB = document.getElementById("dateofbirth").value;
  console.log("profile updated");
}

function updatePassword()
{
  var currentPassword = document.getElementById("currentPassword").value;
  var newPassword = document.getElementById("newPassword").value;
  var newPasswordConfirm = document.getElementById("newPasswordConfirm").value;
  if(currentPassword !== currentUser.password)
  {
    document.getElementById("error-password").innerText = "Wrong current password";
    return;
  }
  if(newPassword.length < 12)
  {
    document.getElementById("error-password").innerText = "New password must have length >= 12";
    return;
  }
  if(newPassword !== newPasswordConfirm)
  {
    document.getElementById("error-password").innerText = "New password and verification doesn't match";
    return;
  }
  document.getElementById("error-password").innerText = ""
  currentUser.password = currentPassword;
}

function constructBookList()
{
  var filterOption = document.getElementById("sort").value;
  console.log(currentUser.bookList);
  var bookList = [];
  if (filterOption == 1)
  {
    bookList = Object.values(currentUser.bookList).sort(sortRating);
  }
  else if(filterOption == 2)
  {
    bookList = Object.values(currentUser.bookList).sort(sortRatingReverse);
  }
  else if(filterOption == 3)
  {
    bookList = Object.values(currentUser.bookList).sort(sortAlphabet);
  }
  var html = ""
  console.log(bookList);
  document.getElementById("book-list").innerHTML = "";
  for(let i =0; i < bookList.length; i++)
  {
    console.log(bookList[i].id);
    const book = data.textbooks[bookList[i].id]
    console.log(book)
    const bookItem = constructBookItem(book, bookList[i].rating);
    document.getElementById("book-list").appendChild(bookItem);
    
//     html += `<div class="book-item">
//     <div class="cover-display" style="background-image: url('${book.CoverImage}');">
//     </div>
//     <span>${book.Title}</span>
//     <button onclick="sharePopUp('${book.ShareLink}')">Share</button>
//     <div class="Stars" style="--rating: ${bookList[i].rating};" aria-label="Rating of this product is ${bookList[i].rating} out of 5.">
//     </div>
// </div>`
  }
 // document.getElementById("book-list").innerHTML = html;
}

function constructBookItem(book, rating)
{
  var outerDiv = document.createElement("div");
  outerDiv.classList.add("book-item")

  var innerDiv1 = document.createElement("div");
  innerDiv1.classList.add("cover-display");
  innerDiv1.style.setProperty("background-image", `url('${book.CoverImage}')`);

  var title = document.createElement("span");
  title.textContent = book.Title

  var shareButton = document.createElement("button");
  shareButton.textContent = "Share"
  shareButton.addEventListener('click', () => {sharePopUp(book.ShareLink)});

  var ratingDiv = document.createElement("div")
  ratingDiv.classList.add("Stars");
  ratingDiv.style.setProperty("--rating", rating);
  ratingDiv.style.setProperty("aria-label", `Rating of this product is ${rating} out of 5.`)

  outerDiv.appendChild(innerDiv1);
  outerDiv.appendChild(title);
  outerDiv.appendChild(shareButton);
  outerDiv.appendChild(ratingDiv);
  return outerDiv;
}


function sharePopUp(link)
{
  console.log(link)
  alert(`Sharing link: \n ${link}`)
}
function sortRating(a, b)
{
  if(a.rating > b.rating)
  {
    return -1
  }
  else if(a.rating < b.rating)
  {
    return 1;
  }
  else
  {
    return 0;
  }
}

function sortRatingReverse(a, b)
{
  if(a.rating < b.rating)
  {
    return -1
  }
  else if(a.rating > b.rating)
  {
    return 1;
  }
  else
  {
    return 0;
  }
}

function sortAlphabet(a, b)
{
  var bookA = data.textbooks[a.id];
  var bookB = data.textbooks[b.id];
  const titleA = bookA.Title;
  const titleB = bookB.Title;
  if (titleA < titleB)
  {
    return -1;
  }
  else if (titleA > titleB)
  {
    return 1;
  }
  else
  {
    return 0;
  }
}
