import Home from "./Home";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import {
  MemoryRouter,
  RouterProvider,
  createMemoryRouter,
} from "react-router-dom";
import React from "react";
import userEvent from "@testing-library/user-event";

interface RootState {
  filterReducer: {
    position: string;
    location: string;
  };
}

const mockStore = configureStore<RootState>();
const initialState = {
  filterReducer: {
    position: "React Developer",
    location: "Sofia",
  },
};

const store = mockStore(initialState);

describe("Home component", () => {
  it("should render heading text correctly", () => {
    const router = createMemoryRouter([{ path: "/", element: <Home /> }]);

    render(
      <React.StrictMode>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </React.StrictMode>
    );
    const heading = screen.getByRole("heading", {
      name: /find your new job today/i,
    });
    const subHeading = screen.getByText(
      /thousands of jobs in the computer, engineering and technology sectors are waiting for you/i
    );

    expect(heading).toBeDefined();
    expect(subHeading).toBeDefined();
  });

  it("should handle form submission correctly", async () => {
    const user = userEvent.setup();

    const renderedHome = render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );

    const input = (await renderedHome.findByPlaceholderText(
      /what position you are looking for/i
    )) as HTMLInputElement;
    await user.type(input, "React Developer");

    const locationInput = (await renderedHome.findByPlaceholderText(
      /location/i
    )) as HTMLInputElement;
    await user.type(locationInput, "Sofia");

    const searchButton = await renderedHome.findByRole("button", {
      name: /search/i,
    });
    await user.click(searchButton);

    expect(input.value).toBe("React Developer");
    expect(locationInput.value).toBe("Sofia");
  });
});
