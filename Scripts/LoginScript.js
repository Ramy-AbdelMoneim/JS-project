let formsubmit = document.forms[0];
let cookies = [];
let usrname;
let loginForm=document.getElementById("loginForm");
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
                localStorage.setItem("birthdate",usersdata[i].birthdate)
                localStorage.setItem("phonenum",usersdata[i].phonenum)
                localStorage.setItem("username",usersdata[i].Username)
                localStorage.setItem("Email",usersdata[i].Email)
                usrname = usersdata[i].Username;
                login = true;
                break;
            }
        }
        if (login == false) {
            alert("Invalid Email or Password")
        }
        else {
            alert(`Welcome back, ${usrname}`)
            if(document.referrer.includes("Register"))
            {
                
                location.assign("../HTML/Home.html")
            }
            else
            {
                history.go(-1);
            }
            
        }


    }
    ).catch(function (error) {
        console.log(error)
    }
    )

}


