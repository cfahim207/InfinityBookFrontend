
const handlecontact = (event) => {
    event.preventDefault();
    const name = getvalue("userName");
    const phone = getvalue("phoneNumber");
    const messages = getvalue("message");
    const info = {
        name, phone, messages,
    };
    console.log(info);
    fetch("https://infinity-books-eight.vercel.app/contact/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(info),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            if (data) {
                
                alert("Message Sent Successfully!!");
            }

        });

}


const getvalue = (id) => {
    const value = document.getElementById(id).value;
    return value;
}
