import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import StatCardList from "../../components/Cards/StatCardList";

const mockCards = [
  {
    title: "Total Projects",
    subtitle: "101",
    description: "Till FY 2025",
  },
  {
    title: "Ongoing Projects",
    subtitle: "34",
    description: "Till FY 2025",
  },
  {
    title: "Completed Projects",
    subtitle: "67",
    description: "Till FY 2025",
  },
];

describe("StatCardList Component", () => {
  it("renders all stat cards passed via props", () => {
    render(<StatCardList cards={mockCards} />);

    mockCards.forEach((card) => {
      expect(screen.getByText(card.title)).toBeInTheDocument();
      expect(screen.getByText(card.subtitle)).toBeInTheDocument();
    });
  });

  it("renders the correct number of cards", () => {
    render(<StatCardList cards={mockCards} />);
    const titles = screen.getAllByText(/Projects/i); // Matches any project title
    expect(titles.length).toBe(mockCards.length);
  });

  it("renders with empty list without crashing", () => {
    render(<StatCardList cards={[]} />);
    expect(screen.queryByText(/Projects/i)).not.toBeInTheDocument();
  });
});
