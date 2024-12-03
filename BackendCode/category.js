const loadCategory = () => {
    fetch("https://infinity-books-eight.vercel.app/books/category/")
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            data.forEach((item) => {
                const parent = document.getElementById("category");
                const div = document.createElement("div");
                div.innerHTML = `
                    <button onclick="loadhotel('${item.id}')"
              class="text-base md:text-lg lg:text-xl text-center font-semibold px-10 py-5 rounded-lg border-2 border-brand hover:bg-brand hover:text-white"
            >
              ${item.name}
            </button>
            `;

                parent.appendChild(div);

            });
        });
};


loadCategory();