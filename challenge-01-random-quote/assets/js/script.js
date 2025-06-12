async function getQuote() {
    const quoteEl = document.getElementById('quote');
    const authorEl = document.getElementById('author');
  
    // Show loading message
    quoteEl.innerText = "Loading quote...";
    authorEl.innerText = "";
  
    try {
      const apiUrl = "https://api.quotable.kurokeita.dev/api/quotes/random";
      const cacheBuster = '?_=' + new Date().getTime();
      
      // Avoid CORS restrictions
      const proxyUrl = 'https://api.allorigins.win/get?url=' + encodeURIComponent(apiUrl + cacheBuster);
  
      const res = await fetch(proxyUrl);
      if (!res.ok) throw new Error("Network response was not OK :(");
  
      const data = await res.json();
      const quoteObj = JSON.parse(data.contents).quote;
  
      quoteEl.innerText = quoteObj.content;
      authorEl.innerText = `— ${quoteObj.author.name}`;
    } catch (e) {
      quoteEl.innerText = "Oops! The quote didn’t load. Try once more. This is a free API, so errors like this can happen.";
      authorEl.innerText = "";
      console.error(e);
    }
  }

document.getElementById("new-quote").addEventListener("click", getQuote);

getQuote();