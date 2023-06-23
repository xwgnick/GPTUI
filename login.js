const backendAuthUrl = "https://gptbackendcheckuserv2.azurewebsites.net/api/CheckUserNamePassword?code=E5Q-x0_qLQ6G-WrNg-52JWLuTPZpOJ9EeOr-MEInPh5dAzFuQzR_mg=="; // Replace with your backend authentication URL  
  
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
        return await response.json();  
    } else {  
        throw new Error("Authentication failed");  
    }  
}  

const loginForm = document.getElementById("loginForm");  
const loginError = document.getElementById("loginError");  
  
loginForm.addEventListener("submit", async (event) => {  
    event.preventDefault();  
  
    const username = document.getElementById("username").value;  
    const password = document.getElementById("password").value;  
      
    try {  
        const result = await authenticate(username, password);  
        if (result.success) {  
            window.location.href = "chatbot.html";  
        } else {  
            loginError.textContent = "Invalid username or password";  
        }  
    } catch (error) {  
        loginError.textContent = error.message;  
    }  
});  
