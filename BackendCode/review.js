const loadReviews = () => {
    fetch("http://127.0.0.1:8000/books/review/")
        .then((res) => res.json())
        .then((data) => displayreview(data));

};


const displayreview = (reviews) => {
    reviews.forEach((review) => {

        const timestamp = `${review.created}`;
        const date = new Date(timestamp);

        // Convert to human-readable format
        const humanReadableDate = date.toLocaleString();
        const parent = document.getElementById("review");
        const div = document.createElement("div");
        div.classList.add("swiper-slide");

        div.innerHTML = `
        
                 
             <div class="testimonial-item">
                <img src="${review.image}" class="testimonial-img" alt="">
                <h3>${review.name}</h3>
                <h5>Hotel: ${review.hotel_display}</h4>
                <h5>${humanReadableDate}</h4>
                <h5>${review.rating}</h4>
                
                <p>
                  <i class="bi bi-quote quote-icon-left"></i>
                  <span>${review.body}</span>
                  <i class="bi bi-quote quote-icon-right"></i>
                </p>
              </div>
            
        
        
        `;
        parent.appendChild(div);

    })
}


loadReviews();