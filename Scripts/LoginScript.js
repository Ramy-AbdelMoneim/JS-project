

let formsubmit = document.forms[0];
let cookies = [];
let usrname;
let loginForm=document.getElementById("loginform")
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
                document.cookie = `usrname=${usersdata[i].Username}`
                localStorage.setItem("profilepic",usersdata[i].Profile)
                usrname = usersdata[i].Username;
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
            loginForm.action=history.go(-1);
        }


    }
    ).catch(function (error) {
        console.log(error)
    }
    )

}


