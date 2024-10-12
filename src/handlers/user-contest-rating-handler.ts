const getUserRating = async (username) => {
  const graphqlQuery = `
      query userContestRankingInfo($username: String!) {
        userContestRanking(username: $username) {
          rating
        }
      }
    `;

  const apiEndpoint = process.env.LC_API_URL;

  const variables = { username };

  try {
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: graphqlQuery,
        variables,
      }),
    });

    console.log(`Fetching Rating Data for username: ${username}`);

    const data = await response.json();
    console.log(`Fetched Rating Data:`, data);

    if (data.errors && data.errors.length > 0) {
      console.error(`Error fetching user rating: ${data.errors[0].message}`);
      return null;
    }

    if (!data || !data.data || !data.data.userContestRanking) {
      console.error("No user contest ranking found");
      return null;
    }

    const rating = data.data.userContestRanking.rating;

    console.log(`${username} has a rating of ${rating}`);

    return rating;
  } catch (error) {
    console.error("Error fetching rating data:", error);
    return null;
  }
};

export default getUserRating;
