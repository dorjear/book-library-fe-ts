import MockAdapter from "axios-mock-adapter";
import BookService, {http} from "./BookService"
import IBookData, {BookStatus} from "../types/Book"; // Update the import path according to your project structure

describe("BookService", () => {
    let mock: MockAdapter;

    beforeEach(() => {
        mock = new MockAdapter(http);
    });

    afterEach(() => {
        mock.reset();
    });

    test("getAll should return an array of books", async () => {
        const books: Array<IBookData> = [
            { id: "1", name: "Book 1", author: "Author 1", status: BookStatus.Available },
            { id: "2", name: "Book 2", author: "Author 2", status: BookStatus.Available },
        ];

        mock.onGet("/books").reply(200, books);

        const response = await BookService.getAll();
        expect(response.data).toEqual(books);
    });

    test("create should post new book data", async () => {
        const newBook: IBookData = { id: "1", name: "Book 1", author: "Author 1", status: BookStatus.Available };

        mock.onPost("/book").reply(200, newBook);

        const response = await BookService.create(newBook);
        expect(response.data).toEqual(newBook);
    });

    test("update should update book data", async () => {
        const updatedBook: IBookData = { id: "1", name: "Book 1", author: "Author 1", status: BookStatus.Available };
        const bookId = "1";

        mock.onPut(`/book`).reply(200, updatedBook);

        const response = await BookService.update(updatedBook);
        expect(response.data).toEqual(updatedBook);
    });

    test("remove should delete a book", async () => {
        const bookId = "1";

        mock.onDelete(`/book/${bookId}`).reply(200);

        const response = await BookService.remove(bookId);
        expect(response.status).toBe(200);
    });
});
