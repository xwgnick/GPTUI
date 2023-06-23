const backendAuthUrl = "https://gptbackendcheckuser.azurewebsites.net/api/CheckUserNamePassword?code=r-oQbN3YSFmQwu7sYoiIBHwiSkCL-xJ9lVcgIMEoN6X0AzFu6CqIEw=="; // Replace with your backend authentication URL  
  
async function authenticate(username, password) {  
    const response = await fetch(backendAuthUrl, {  
        method: "POST",  
        headers: {  
            "Content-Type": "application/json"  
        },  
        body: JSON.stringify({  
            UserName: username,  
            Password: password  
        })  
    });  
  
    if (response.ok) {  
        console.log("here")
        return await response.json();  
    } else {  
        throw new Error("Authentication failed");  
    }  
}  

console.log("here1")
console.log("here2")
const loginForm = document.getElementById("loginForm");  
const loginError = document.getElementById("loginError");  
  
loginForm.addEventListener("submit", async (event) => {  
    event.preventDefault();  
  
    const username = document.getElementById("username").value;  
    const password = document.getElementById("password").value;  
    console.log(username)
    console.log(password)
      
    try {  
        const result = await authenticate(username, password);  
        if (result.success) {  
            window.location.href = "index.html";  
        } else {  
            loginError.textContent = "Invalid username or password";  
        }  
    } catch (error) {  
        loginError.textContent = error.message;  
    }  
});  
