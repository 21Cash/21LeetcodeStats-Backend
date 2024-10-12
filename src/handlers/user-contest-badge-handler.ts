import getUserRating from "./user-contest-rating-handler";

const getUserContestBadge = async (username) => {
  const graphqlQuery = `
      query userPublicProfile($username: String!) {
        matchedUser(username: $username) {
          contestBadge {
            name
            expired
          } 
        }
      }
    `;

  const variables = {
    username,
  };
  const apiEndpoint = process.env.LC_API_URL as string;
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

    const data = await response.json();
    if (!data || !data.data || !data.data.matchedUser) {
      console.error("No matched user found");
      return null;
    }

    const badge = data.data.matchedUser.contestBadge;

    if (!badge || badge.expired) {
      return { badgeName: null, rating: null };
    }

    const rating = await getUserRating(username);

    return {
      badgeName: badge.name,
      rating,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

export default getUserContestBadge;
