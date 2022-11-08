import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Card from "./Card";

// Smoke test for card 
it("renders without crashing", () => {
    render(<Card />)
})

// Snapshot test for card
it("matches snapshot", () => {
    const { asFragment } = render(<Card />)
    expect(asFragment()).toMatchSnapshot()
})