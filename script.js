// Event listener for search button
document.getElementById('searchButton').addEventListener('click', function() {
    const searchTerm = document.getElementById('searchBar').value.trim(); // Trim whitespace from the search term

    // Check if the search term is not empty
    if (searchTerm) {
        // Clear previous search results
        const bookList = document.getElementById('book-list');
        bookList.innerHTML = '';

        // Fetch books based on the search term
        fetchBooksByTerm(searchTerm);
    } else {
        alert('Please enter a search term.');
    }
});

// Function to fetch books based on the search term
async function fetchBooksByTerm(searchTerm) {
    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`);
        const data = await response.json();
        const books = data.items;

        const bookList = document.getElementById('book-list');

        // Display books in the UI
        books.forEach(async (book) => {
            const bookItem = document.createElement('div');
            bookItem.classList.add('book');

            const title = book.volumeInfo.title;
            const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author';
            const thumbnail = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/150';
            const averageRating = book.volumeInfo.averageRating || 'Not rated';

            // Fetch reviews for the book
            const reviews = await fetchBookReviews(title); // Assuming there's a function to fetch reviews

            bookItem.innerHTML = `
                <img src="${thumbnail}" alt="${title}">
                <h3>${title}</h3>
                <p>By ${authors}</p>
                <p>Average Rating: ${averageRating}</p>
                <p>Reviews: ${reviews.join(', ')}</p> <!-- Display reviews here -->
            `;

            bookList.appendChild(bookItem);
        });
    } catch (error) {
        console.error('Error fetching books:', error);
        alert('An error occurred while fetching books. Please try again later.');
    }
}

// Function to fetch reviews for a book
async function fetchBookReviews(title) {
    // You need to implement a function to fetch reviews from a source/API
    // This function could make another API call or access a database where reviews are stored
    // For simplicity, let's assume reviews are fetched from a static array
    const reviews = [
        'Great book!',
        'Could be better...',
        'Highly recommended!',
        'Average book, nothing special.'
    ];

    // For demonstration purposes, let's return a promise that resolves with the reviews array
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(reviews);
        }, 1000); // Simulating asynchronous behavior
    });
}
