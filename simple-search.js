// Define your products
const products = [
    { title: "Cartoon T-Shirts", category: "adidas", price: "£35", url: "sproduct.html", image: "img/products/f1.jpg" },
    { title: "Cartoon T-Shirts", category: "adidas", price: "£49", url: "sproduct1.html", image: "img/products/f2.jpg" },
    // Add more products here
];

// Configuration for Fuse
const options = {
    keys: ['title', 'category'],
    threshold: 0.3
};

// Initialize Fuse
const fuse = new Fuse(products, options);

// Get DOM elements
const searchContainer = document.getElementById('search-container');
const searchInput = document.getElementById('search-input');

const searchResults = document.getElementById('search-results');
const mobileSearchButton = document.getElementById('mobile-search-button');

// Add event listeners
searchInput.addEventListener('input', performSearch);

document.addEventListener('click', handleClickOutside);

function performSearch() {
    const query = searchInput.value;
    if (query.length < 2) {
        hideResults();
        return;
    }

    const results = fuse.search(query);
    displayResults(results);
}

function displayResults(results) {
    if (results.length === 0) {
        searchResults.innerHTML = '<p class="no-results">No results found</p>';
    } else {
        const resultHtml = results.map(result => `
            <div class="search-result-item" data-url="${result.item.url}">
                <img src="${result.item.image}" alt="${result.item.title}">
                <div class="result-content">
                    <div class="result-title">${result.item.title}</div>
                    <div class="result-details">${result.item.category} - ${result.item.price}</div>
                </div>
            </div>
        `).join('');

        searchResults.innerHTML = resultHtml;

        // Add click event listeners to search result items
        const resultItems = searchResults.querySelectorAll('.search-result-item');
        resultItems.forEach(item => {
            item.addEventListener('click', () => {
                const url = item.getAttribute('data-url');
                window.location.href = url;
            });
        });
    }
    
    searchResults.style.display = 'block';
}

function hideResults() {
    searchResults.style.display = 'none';
}

function handleClickOutside(event) {
    if (!searchContainer.contains(event.target)) {
        hideResults();
    }
}

// Prevent hiding results when clicking inside the results
searchResults.addEventListener('click', (event) => {
    event.stopPropagation();
});

mobileSearchButton.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent the click from immediately closing the search
    searchContainer.classList.toggle('active');
    if (searchContainer.classList.contains('active')) {
        searchInput.focus();
    } else {
        hideResults();
    }
});

// Close mobile search when clicking outside
document.addEventListener('click', (event) => {
    if (searchContainer.classList.contains('active') &&
        !searchContainer.contains(event.target) && 
        event.target !== mobileSearchButton) {
        searchContainer.classList.remove('active');
        hideResults();
    }
});

// Prevent closing when clicking inside the search container
searchContainer.addEventListener('click', (event) => {
    event.stopPropagation();
});