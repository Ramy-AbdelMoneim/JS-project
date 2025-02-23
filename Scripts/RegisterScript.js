let usrnamreg=/[\w]+/;
let mailreg=/^[a-zA-Z][\w-\.]+@[a-zA-Z]+\.[a-zA-Z]{2,4}$/;
document.forms[0].onsubmit=function(event)
{
    let usrname=document.getElementById('InputUsrname');
    let usrmail=document.getElementById('InputEmail');
    let usrpass=document.getElementById('InputPassword');
    let confpass=document.getElementById('confPassword');

    if(usrnamreg.test(usrname.value)==false)
    {
        event.preventDefault();
        alert('Invalid Username');
    }
    else if(mailreg.test(usrmail.value)==false)
    {
        event.preventDefault();
        alert('Invalid Email format');
    }
    else if(usrpass.value.length<8)
    {
        event.preventDefault();
        alert('Password must be atleast 8 characters long');
    }
    else if(usrpass.value!=confpass.value)
    {
        event.preventDefault();
        alert('Passwords do not match');
    }
    else
    {
        alert('Registration Successful');
    }
}