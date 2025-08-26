export async function getAISuggestion(query) {
  // TODO: Replace with LangChain / Langbase / OpenAI call
  // For now, return dummy data
  return {
    title: "Blue Bottle Coffee",
    content: "Trendy cafe with artisan coffee and pastries.",
    category: "Cafes",
    address: "66 Mint St, San Francisco, CA",
    phoneNumber: "(510) 653-3394",
    addressLink: "https://goo.gl/maps/jD7C7P2UXQe8K4A39",
    phoneLink: "tel:+15106533394",
    imageUrl: "https://source.unsplash.com/featured/?coffee",
    section: "feed",
    mediaType: "image",
  };
}
