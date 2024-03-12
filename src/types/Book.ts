export default interface IBookData {
  id?: any | null,
  name: string,
  author: string,
  status: BookStatus
}


export enum BookStatus {
  Available = "Available",
  Borrowed = "Borrowed"
}
