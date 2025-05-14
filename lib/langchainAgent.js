const { initializeAgentExecutorWithOptions } = require("langchain/agents");
const { Tool } = require("langchain/tools");

const GooglePlacesTool = new Tool({
  name: "GooglePlacesSearch",
  func: async (query) => {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${process.env.GOOGLE_API_KEY}`
    );
    const data = await res.json();
    return JSON.stringify(data);
  },
  description: "Google Places search",
});

async function searchPlaces(query) {
  const executor = await initializeAgentExecutorWithOptions(
    [GooglePlacesTool],
    {},
    {
      agentType: "zero-shot-react-description",
    }
  );
  const result = await executor.call({ input: query });
  return result.output;
}

module.exports = { searchPlaces };
