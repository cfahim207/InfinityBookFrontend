const getparams = () => {
    const parm = new URLSearchParams(window.location.search).get("bookId");
    console.log(parm);
    fetch(`http://127.0.0.1:8000/books/list/?id=${parm}`)
        .then((res) => res.json())
        .then((data) => {
            bookDetails(data);
            console.log(data);
        });
}

const bookDetails = (details) => {
    console.log(details);
    details.forEach((book) => {

        const parent = document.getElementById("bookDetails");
        const div = document.createElement('div');
        div.innerHTML = `
    <div class="flex flex-col md:flex-row items-center md:gap-10 text-raleway lg:ps-10" >
    <figure class="md:w-2/5 h-full py-5 md:py-0 lg:py-10">
            <img
              class="w-full h-full object-cover"
              src=${book.image}
              alt="Book"
            />
          </figure>
          <div class="md:w-3/5 lg:p-10">
            <h3 class="text-xl md:text-2xl lg:text-5xl font-bold text-brand">
              ${book.title}
            </h3>
            <h5 class="text-md md:text-xl lg:text-2xl mt-3 mb-10">
              ${book.writer}
            </h5>
            <p
              class="text-base md:text-lg lg:text-xl mt-5 lg:pr-5 text-justify lg:text-left mb-10"
            >
              ${book.descriptions}
            </p>
            <button
              class="text-base md:text-lg lg:text-xl font-bold bg-brand text-white px-5 py-4 mr-2  rounded-lg  hover:bg-secondary hover:text-black"
            >
              Download Now
            </button>
            <button
              class="text-base md:text-lg lg:text-xl font-bold bg-brand text-white px-5  py-4 rounded-lg  hover:bg-secondary hover:text-black"
            >
              Give Review
            </button>
          </div>
    </div>
    
    `;
        parent.appendChild(div);

    })

}


getparams();