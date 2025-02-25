document.getElementById("shorten-btn").addEventListener("click", function() {
    let longUrl = document.getElementById("long-url").value;
    if (longUrl === "") {
        alert("Please enter a URL!");
        return;
    }
    
    // Generate a random short string
    let shortKey = Math.random().toString(36).substring(2, 8);
    let shortUrl = `https://short.ly/${shortKey}`;

    // Display the short URL
    document.getElementById("shortened-url").innerHTML = 
        `Short URL: <a href="${longUrl}" target="_blank">${shortUrl}</a>`;
});
