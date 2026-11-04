import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Jobs from "../../pages/Jobs/Jobs.jsx";
import { jobs } from "../../mock/mockData.jsx";

describe("Jobs component", () => {
  it("renders Jobs container", () => {
    render(<Jobs />);
    const jobsDiv = screen.getByTestId("jobs");
    expect(jobsDiv).toBeInTheDocument();
  });

  it("renders job entries inside JobTable", () => {
    render(<Jobs />);

    // Check for some job properties in the rendered output (e.g. jobId or userName)
    jobs.forEach(({ jobId, userName }) => {
      // Check that jobId is rendered (adjust depending on JobTable implementation)
      expect(screen.getByText(jobId)).toBeInTheDocument();

      // Check that userName is rendered
      expect(screen.getByText(userName)).toBeInTheDocument();
    });
  });
});
