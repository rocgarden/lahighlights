import { describe, it, expect } from "vitest";
// Or use `import { describe, it, expect } from '@jest/globals';` if using Jest

import { generateItineraryMetadata } from "./generateItineraryMetadata"; // adjust path as needed

describe("generateItineraryMetadata", () => {
  it("returns fallback metadata if itinerary is missing", () => {
    const result = generateItineraryMetadata(null, "test-slug");
    expect(result).toEqual({
      title: "Itinerary Not Found | Norah Bird",
      description:
        "This itinerary could not be found. Try exploring other curated trips.",
    });
  });

  it("returns metadata with description if available", () => {
    const itinerary = {
      title: "Beach Day",
      city: "Santa Barbara",
      description: "Relax and enjoy the beach.",
      fileUrl: "https://example.com/image.jpg",
      highlights: [],
    };q

    const result = generateItineraryMetadata(itinerary, "beach-day");
    expect(result.title).toContain("Beach Day in Santa Barbara");
    expect(result.description).toBe("Relax and enjoy the beach.");
    expect(result.openGraph.images[0].url).toBe(itinerary.fileUrl);
  });

  it("uses fallback text if no description is available", () => {
    const itinerary = {
      title: "City Walk",
      city: "Paris",
      description: "",
      fileUrl: "",
      highlights: [
        { activity: "walk", place: "Eiffel Tower" },
        { activity: "lunch", place: "Café de Flore" },
      ],
    };

    const result = generateItineraryMetadata(itinerary, "city-walk");
    expect(result.description).toContain(
      "Explore a curated itinerary in Paris"
    );
    expect(result.description).toContain(
      "walk at Eiffel Tower, lunch at Café de Flore"
    );
    expect(result.openGraph.images).toEqual([]);
  });
});
