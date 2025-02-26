

let formsubmit = document.forms[0];
let cookies = [];
let usrname;
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
                usrname = usersdata[i].username;
                login = true;
                break;
            }
        }
        if (login == false) {
            alert("Invalid Email or Password")
        }
        else {
            // getcookies();
            alert(`Welcome back, ${usrname}`)
            formsubmit.submit();
        }


    }
    ).catch(function (error) {
        console.log(error)
    }
    )

}
