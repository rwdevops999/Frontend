import { setupServer } from "msw/node";
import { restHandlers } from "./rest";
import { delay, http, HttpResponse } from "msw";

export const backend = setupServer(...restHandlers);

export const simulateDelay = (endpoint: string) => {
  backend.use(
    http.get(endpoint, async () => {
      await delay();
      return HttpResponse.json([]);
    })
  );
};

export const simulateError = (endpoint: string) => {
  backend.use(
    http.get(endpoint, () => {
      return HttpResponse.error();
    })
  );
};

export const simulateNoTutorials = (endpoint: string) => {
  backend.use(http.get(endpoint, () => HttpResponse.json([])));
};
