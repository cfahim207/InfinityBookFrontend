const loadhotel = (findhotel) => {
    document.getElementById("booksContainer").innerHTML = "";
  let url = "https://infinity-books-eight.vercel.app/books/list/"
    if (findhotel) {
      url = `https://infinity-books-eight.vercel.app/books/list/?category=${findhotel}`
    }
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            if (data.length > 0) {
                displayHotel(data);
            }
            else {
                document.getElementById("booksContainer").innerHTML = "";

            }


        });
}



const displayHotel = (books) => {
    books.forEach((book) => {
        const parent = document.getElementById("booksContainer");
        const div = document.createElement('div');
        div.classList.add("card", "card-compact","bg-brand")
        div.innerHTML = ` 
              <figure>
                <img src=${book.image} alt="Book" />
              </figure>
              <div
                class="card-body py-20 text-white flex md:flex-row items-center justify-between"
              >
                <div class="md:w-1/2">
                  <h2 class="card-title">${book.title}</h2>
                  <p>${book.writer}</p>
                </div>
                <button
                  class="font-semibold text-xs md:text-sm lg:text-base bg-white text-brand px-3 py-2 rounded-lg hover:bg-secondary hover:text-black"
                >
                  <a href="book-info.html?bookId=${book.id}"><a href="book-info.html?bookId=${book.id}">Read More</a></a>
                </button>
              </div>
        `;
        parent.appendChild(div);
    });
};


loadhotel();