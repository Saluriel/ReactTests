import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

it("works when you click on the right arrow", function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

// Smoke test for carousel
it("renders without crashing", () => {
  render(<Carousel />)
})

// Snapshot test for carousel
it("matches snapshot", () => {
  const { asFragment } = render(<Carousel />)
  expect(asFragment()).toMatchSnapshot()
})

it("works when you click on the left arrow", () => {
  const { queryByTestId, queryByAltText } = render(<Carousel />)

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forwards and then backwards again so you are back on the first image
  const leftArrow = queryByTestId("left-arrow");
  const rightArrow = queryByTestId("right-arrow")
  fireEvent.click(rightArrow)
  fireEvent.click(leftArrow)

  // expect the first image to show and not the second or third
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
})

it("does not show left arrow on the first image", () => {
  const { queryByTestId, queryByAltText } = render(<Carousel />)

  expect(queryByTestId("left-arrow")).toHaveClass("hidden");
  expect(queryByTestId("right-arrow")).not.toHaveClass("hidden");

})

it("does not show right arrow on the last image", () => {
  const { queryByTestId, queryByAltText } = render(<Carousel />)

  // navigate to the third image
  const rightArrow = queryByTestId("right-arrow")
  fireEvent.click(rightArrow)
  fireEvent.click(rightArrow)

  expect(queryByTestId("right-arrow")).toHaveClass("hidden");
  expect(queryByTestId("left-arrow")).not.toHaveClass("hidden");
})