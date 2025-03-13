import { isLogged } from "../modules/checkCookies.js";
import { Logout } from "../modules/checkCookies.js";
isLogged();

//  Logout
let LogoutNav=document.getElementsByClassName('Logout')[0];
let LogoutHam=document.getElementsByClassName('Logout')[1];
LogoutNav.onclick=Logout;
LogoutHam.onclick=Logout;
