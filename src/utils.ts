import { MockAgent, MockClient, setGlobalDispatcher } from "undici";

export const TO_REPLACE = (_: any): any => {
  throw new Error("Remove this and make the test green");
};

const mockAgent = new MockAgent();
mockAgent.disableNetConnect();
let mockClient;

export const mockBooksApi = () => {
  mockClient = new MockClient("https://my-books-library.com", {
    agent: mockAgent,
  });
  mockClient
    .intercept({
      path: "/authors.json",
      method: "GET",
    })
    .reply(200, [
      { id: 1, name: "Victor Hugo" },
      { id: 2, name: "Robin Hobb" },
    ])
    .times(1);
  mockClient
    .intercept({
      path: "/authors/1.json",
      method: "GET",
    })
    .reply(200, ["Les Misérables", "Le Dernier Jour d'un condamné"])
    .times(1);
  mockClient
    .intercept({
      path: "/authors/2.json",
      method: "GET",
    })
    .reply(200, ["L'Assassin royal", "Le Soldat chamane"])
    .times(1);

  setGlobalDispatcher(mockClient);
};

export const releaseBooksApiMock = () => {
  mockClient.close();
};
