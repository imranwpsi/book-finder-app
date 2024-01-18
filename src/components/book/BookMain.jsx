import { useState } from 'react';
import bookData from '../../assets/bookData';
import BookHeader from './BookHeader';
import BookList from './BookList';

export default function BookMain() {
    const [books, setBooks] = useState(bookData);
	const [sortTerm, setSortTerm] = useState("");

	function handleSearch(searchTerm) {
		let filtered;
		// When search term exist then search term wise books data set in state
		if (searchTerm) {
			filtered = bookData.filter((book) =>
				book.name.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}
		// When search term empty then getting existing all books data set in state 
		else {
			// Reset to the initial data
			filtered = bookData;
		}

		filtered = prepareSortData(sortTerm, filtered);
		
		setBooks([...filtered]);
    }

	function handleSort(sortTerm) {
		setSortTerm(sortTerm);
		let sortedBooks = [...books];

		sortedBooks = prepareSortData(sortTerm, sortedBooks);

		setBooks(sortedBooks);
	}

	function prepareSortData(sortTerm, sortedBooks) {
		switch (sortTerm) {
			case 'name_asc':
				sortedBooks.sort((a, b) => a.name.localeCompare(b.name));
				break;
			case 'name_desc':
				sortedBooks.sort((a, b) => b.name.localeCompare(a.name));
				break;
			case 'year_asc':
				sortedBooks.sort((a, b) => a.publishedYear - b.publishedYear);
				break;
			case 'year_desc':
				sortedBooks.sort((a, b) => b.publishedYear - a.publishedYear);
				break;
			case '':
				// Reset to the initial order
				sortedBooks.sort((a, b) => a.id - b.id);
				break;
		}
		return sortedBooks;
	}

	function handleFavorite(bookId) {
        setBooks(books.map((book) => {
            if (book.id === bookId) {
                return {...book, isFavorite: !book.isFavorite};
            } else {
                return book;
            }
        }))
    }

    return (
		<main className="my-10 lg:my-14">
			<BookHeader onSearch={handleSearch} onSort={handleSort} />

			<BookList books={books} onFav={handleFavorite} />
		</main>
	);
}
