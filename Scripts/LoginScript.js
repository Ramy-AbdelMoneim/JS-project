

let formsubmit = document.forms[0];
let cookies = [];

function getcookies() {
    let allcookies = document.cookie.split(';');
    for (let i = 0; i < allcookies.length; i++) {
        var [key, value] = allcookies[i].split('=');
        cookies[key] = value;
    }
    return cookies;
}
formsubmit.onsubmit = function (event) {
    event.preventDefault();
    let Mail = document.getElementById("InputEmail").value;
    let Password = document.getElementById("InputPassword").value;
    fetch("../JSON/users.json").then(function (response) {
        if (!response.ok) {
            throw new Error('error')
        }

        return response.json()
    }
    ).then(function (responseText) {
        let usersdata = responseText;
        let login = false;
        for (let i in usersdata) {
            if (Mail == i && Password == usersdata[i].Password) {
                // console.log("Login Successful")
                document.cookie = `usrname=${usersdata[i].username}`
                login = true;
                break;
            }
        }
        if (login == false) {
            alert("Invalid Email or Password")
        }
        else {
            getcookies();
            alert(`Welcome back, ${cookies.usrname}`)
            formsubmit.submit();
        }


    }
    ).catch(function (error) {
        console.log(error)
    }
    )

}
