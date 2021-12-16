let books;

async function renderBooks(filter){
  const booksWrapper = document.querySelector('.books')

  booksWrapper.classList += ' books__loading'

  if(!books){
    books = await getBooks();
  }
  
  booksWrapper.classList.remove('books__loading')

  if (filter === 'LOW_TO_HIGH'){
    books.sort((a , b) => (a.salePrice || a.originalPrice) - (b.salePrice || b.originalPrice))
  }
  else if (filter === 'HIGH_TO_LOW'){
    books.sort((a , b) => (b.salePrice || b.originalPrice) - (a.salePrice || a.originalPrice))
  }
  else if (filter === 'Rating'){
    books.sort((a , b) => b.rating - a.rating)
  }

  const booksHTML = books.map(book => {
    return `<div class="book">
      <figure class="book__img--wrapper">
        <img class="book__img" src="${book.url}" alt=""></img>
      </figure>
      <div class="book__title">
        ${book.title}
      </div>
      <div class="book__ratings">
        ${ratingsHTML(book.rating)}
      </div>
      
      <div class="book__price">
        ${priceHTML(book.originalPrice, book.salePrice)}
      </div>
    </div>`
  }).join('')

  booksWrapper.innerHTML = booksHTML
}

function priceHTML(originalPrice, salePrice){
  if (!salePrice){
    return `$${originalPrice.toFixed(2)}`
  }
  else{
    return `<span class="book__price--normal">$${originalPrice.toFixed(2)}</span> $${salePrice.toFixed(2)}`
  }
  
}

function ratingsHTML(rating){
  let ratingHTML = ''
  for (let i = 0; i < Math.floor(rating); ++i){
    ratingHTML += '<i class="fas fa-star"></i>\n'
  }
  if (!Number.isInteger(rating)){
    ratingHTML += '<i class="fas fa-star-half-alt"></i>\n'
  }
  return ratingHTML
}

function filterBooks(event){
  renderBooks(event.target.value)
}

setTimeout(() => {
  renderBooks()
})
// FAKE DATA
function getBooks() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "The Couple Next Door",
          url: "assets/couplenext.jpg",
          originalPrice: 19.95,
          salePrice: 9.55,
          rating: 4.5,
        },
        {
          id: 2,
          title: "1984",
          url: "assets/better1984.jpg",
          originalPrice: 20.95,
          salePrice: 12.95,
          rating: 4.5,
        },
        {
          id: 3,
          title: "Fahrenheit 451",
          url: "assets/fahrenheit.jpg",
          originalPrice: 15.95,
          salePrice: 9.55,
          rating: 4.5,
        },
        {
          id: 4,
          title: "The Inheritance Games",
          url: "assets/inheritance.jpg",
          originalPrice: 23.99,
          salePrice: 12.99,
          rating: 4.5,
        },
        {
          id: 5,
          title: "The Invisible Life of Addie Larue",
          url: "assets/invisible.jpg",
          originalPrice: 11.95,
          salePrice: null,
          rating: 4,
        },
        {
          id: 6,
          title: "It Ends With Us",
          url: "assets/itendswithus.jpg",
          originalPrice: 18.99,
          salePrice: null,
          rating: 5,
        },
        {
          id: 7,
          title: "Love and Other Words",
          url: "assets/loveandotherwords.jpg",
          originalPrice: 19.99,
          salePrice: null,
          rating: 4,
        },
        {
          id: 8,
          title: "Matched",
          url: "assets/matched.jpg",
          originalPrice: 12.50,
          salePrice: null,
          rating: 4.5,
        },
        {
          id: 9,
          title: "Of Mice and Men",
          url: "assets/miceandmen.jpg",
          originalPrice: 9.25,
          salePrice: null,
          rating: 4,
        },
        {
          id: 10,
          title: "No Longer Human",
          url: "assets/nolongerhuman.jpg",
          originalPrice: 19.99,
          salePrice: null,
          rating: 4,
        },
        {
          id: 11,
          title: "The Ocean at the End of the Lane",
          url: "assets/ocean.jpg",
          originalPrice: 14.95,
          salePrice: null,
          rating: 4.5,
        },
        {
          id: 12,
          title: "Today, Tonight, Tomorrow",
          url: "assets/today.jpg",
          originalPrice: 24.95,
          salePrice: null,
          rating: 4
        },
      ])
    }, 1000) 
  })
}
