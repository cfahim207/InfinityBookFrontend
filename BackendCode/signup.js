const handleregistration = async (event) => {
    event.preventDefault();
    const username = getinfo("username");
    const first_name = getinfo("first_name");
    const last_name = getinfo("last_name");
    const email = getinfo("email");
    const phone = getinfo("mobile");
    const address = getinfo("address");
    const password = getinfo("password");
    const confirm_password = getinfo("confirm_password");

    const image_file = document.getElementById("Profile_Image").files[0];
    let imageUrl = "";
    if (image_file) {
        const imgFormData = new FormData();
        imgFormData.append('image', image_file);
        const imgbbResponse = await fetch('https://api.imgbb.com/1/upload?key=5cb9b4e07adda01b2e7f1ca548a925bc', {
            method: 'POST',
            body: imgFormData
        });
        const imgbbData = await imgbbResponse.json();
        if (imgbbData.status === 200) {
            imageUrl = imgbbData.data.url;
        } else {
            alert('Image upload failed!');
            return;
        }
    }
    const image = imageUrl;

    const info = {
        username, first_name, last_name, email, address, phone, image, password, confirm_password,
    };
    console.log(info)

    if (password === confirm_password) {
        document.getElementById("error").innerText = "";
        if (
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
                password
            )
        ) {

            fetch("http://127.0.0.1:8000/reader/register/", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(info),
            })
                .then((res) => res.json())
                .then((data) => {

                    console.log(data);
                    if (data) {
                        document.getElementById("error").innerText =
                            "Please Check Your Email For Confirmation";
                        alert("Please Check Your Email For Confirmation");

                    }
                });
        } else {
            document.getElementById("error").innerText =
                "***pass must contain eight characters, at least one letter, one number and one special character***";
        }
    }

    else {
        document.getElementById("error").innerText =
            "***password and confirm password do not match***";
        alert("password and confirm password do not match");
    }



}

const getinfo = (id) => {
    const value = document.getElementById(id).value;
    return value;
}


const handleLogin = (event) => {
    event.preventDefault();
    const username = getinfo("login-username");
    const password = getinfo("login-password");
    if ((username, password)) {

        fetch("http://127.0.0.1:8000/reader/login/", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ username, password }),
        })
            .then((res) => res.json())
            .then((data) => {
                // console.log(data)
                if (data.token && data.user_id && data.reader_id) {
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("user_id", data.user_id);
                    localStorage.setItem("reader_id", data.reader_id);
                    window.location.href = "index.html";
                    alert("Login Successfully!!! **Welcome To InfinityBooks**");
                }
                else {
                    document.getElementById("login-error").innerText =
                        "***usarname and password did'nt Match***";
                    alert("usarname and password did'nt Match");
                }
            });
    }

};

const handlelogOut = () => {
    const token = localStorage.getItem("token");
    // console.log(token);
    fetch("http://127.0.0.1:8000/reader/login/", {
        method: "POST",
        headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            // console.log(data);
            localStorage.removeItem("token");
            localStorage.removeItem("user_id");
            localStorage.removeItem("reader_id");
            window.location.href = "login.html";
        });
};




// nav hidden button

const token = localStorage.getItem("token");
if (token) {
    document.getElementById("navItem").innerHTML = `
    
    <button onclick="handlelogOut()"
                class="font-bold text-xs md:text-sm lg:text-base bg-white text-brand px-5 py-2 rounded-full hover:bg-secondary hover:text-black">
                LogOut
              </button>
  `;
}
else {
    document.getElementById("navItem").innerHTML = `
  <button onclick="displayLogin()"
                class="font-bold text-xs md:text-sm lg:text-base bg-white text-brand px-5 py-2 rounded-full hover:bg-secondary hover:text-black">
                Log In
              </button>
  `;
}