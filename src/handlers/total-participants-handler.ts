const getTotalParticipantsCount = async (): Promise<number> => {
  const apiEndpoint = process.env.LC_API_URL as string;
  const graphqlQuery = `
        query globalRanking {
          globalRanking(page: 2) {
            totalUsers
          }
        }
      `;
  try {
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ query: graphqlQuery }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch global ranking: ${response.status}`);
    }

    const data = await response.json();
    const totalParticipants: number = data.data.globalRanking.totalUsers;

    return totalParticipants;
  } catch (error) {
    console.error("Error fetching total participants count:", error);
    throw error;
  }
};

export default getTotalParticipantsCount;
