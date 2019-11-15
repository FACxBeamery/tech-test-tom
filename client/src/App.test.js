import React from 'react';
import ReactDOM from 'react-dom';
import WelcomePage from "./components/WelcomePage"
import App from "./App"
// import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, cleanup } from "@testing-library/react";
import mockResponse from "./mockResponse.js"

afterEach(cleanup);
it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
});




global.fetch = jest
    .fn()
    .mockImplementation(() =>
        Promise.resolve({ text: () => Promise.resolve(mockResponse) })
    );
test("Dropdown working", () => {
    const { getByText, getByTestId, queryByText, queryAllByTestId } = render(
        <App />
    );

    const textForm = getByTestId("text-form")
    fireEvent.change(textForm, { target: { value: "London" } });

    const londonButton = getByText("London, GB") // london button appears in autocomplete dropdown
    fireEvent.click(londonButton)

    const firstJob = setTimeout(() => getByText("Blackbox"), 1000) // check first job is showing after waiting for it to render

    const lastJob = setTimeout(() => getByText("paddle.com"), 1000) // last job showing

})

