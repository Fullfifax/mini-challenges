async function getQuote() {
    try {
        const apiUrl = "https://zenquotes.io/api/random";
        const cacheBuster = '?_=' + new Date().getTime();

        // Avoid CORS restrictions
        const proxyUrl = 'https://api.allorigins.win/get?url=' + encodeURIComponent(apiUrl + cacheBuster);

        const res = await fetch(proxyUrl);
        if(!res.ok) throw new Error("Network response was not OK :(");

        const data = await res.json();
        const quotes = JSON.parse(data.contents);

        document.getElementById('quote').textContent = `${quotes[0].q}`;
        document.getElementById('author').textContent = `${quotes[0].a}`;
    } catch (e) {
        document.getElementById('quote').textContent = "Failed to load quote.";
        document.getElementById('author').textContent = "";
        console.error(e);
    }
}

getQuote();