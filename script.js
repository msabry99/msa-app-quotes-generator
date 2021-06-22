const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const facebookBtn = document.getElementById('facebook');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById("loader");

// Loading Spinner Show And Hide Content While Content is Ready to show
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// While Content is ready to show, hide spinner Loading and Show Content
function complete() {
    if (!loader.hidden) {
        loader.hidden = true;
        quoteContainer.hidden = false;
    }
}

// Get Quote From API
async function getQuote() {
    // Loading Spinner Until Data is coming from API
    loading();

    const proxyUrl = 'https://secret-ocean-49799.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();

        quoteText.innerText = data.quoteText;

        if (data.quoteAuthor === '') {
            quoteAuthor.innerText = 'Unknown Author';
        } else {
            quoteAuthor.innerText = data.quoteAuthor;
        } 

        // Hide Spinner Loading And Show The Quotes After it is coming from API
        complete();
        
    } catch (error) {
        // console.log('Whoops!', error);
        getQuote();
    }
}

// Get Quote For Twitter Share
/* Dynamic Function of Share Quotes For Any Social Media Pages */
function shareQuote(url) {
    const quote = quoteText.innerText;
    const author = quoteAuthor.innerText;
    const quoteUrl = `${url}?text=${quote} - ${author}`;

    window.open(quoteUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);

twitterBtn.addEventListener('click', () => {
    shareQuote('https://twitter.com/intent/tweet')
});

// On Load Function of Getting API Data 
getQuote();