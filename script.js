async function fetchGPTAnswer(question) {  
    // Replace with your GPT endpoint URL and API key  
    const endpoint = "https://gptresource.openai.azure.com/openai/deployments/GPT35/chat/completions?api-version=2023-03-15-preview";  
    const apiKey = "ba9f4c1a086c4e66926b9a0cf333ec77";  
  
    const messages = [  
        { role: "system", content: "You are an AI assistant that helps people find information." },  
        { role: "user", content: question }  
    ];  
  
    const response = await fetch(endpoint, {  
        method: "POST",  
        headers: {  
            "Content-Type": "application/json",  
            "api-key": apiKey  
        },  
        body: JSON.stringify({  
            messages: messages,  
            max_tokens: 800,  
            temperature: 0.7,  
            frequency_penalty: 0,  
            presence_penalty: 0,  
            top_p: 0.95,  
            stop: null  
        })  
    });  

    if (!response.ok) {  
        console.error('Error status:', response.status);  
        console.error('Error response:', await response.text());  
        throw new Error("Failed to fetch answer");  
    }  
  
    const data = await response.json();  
    const lastMessage = data.choices[0].message.content;  
    return lastMessage;  
}  

const userInput = document.getElementById("userInput");  
const sendButton = document.getElementById("sendButton");  
const chatOutput = document.getElementById("chatOutput");  
  
sendButton.addEventListener("click", async () => {  
    console.log("Send button clicked"); // Add this line  
    const question = userInput.value;  
    userInput.value = "";  
    chatOutput.innerHTML += `<div>User: ${question}</div>`;  
    const answer = await fetchGPTAnswer(question);  
    chatOutput.innerHTML += `<div>Bot: ${answer}</div>`;  
});  