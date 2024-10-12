import getUserContestBadge from "./user-contest-badge-handler";
import getUsernameByRank from "./username-by-rank-handler";

const getUserInfo = async (userRank) => {
  try {
    const username = await getUsernameByRank(userRank);

    const { badgeName, rating } = await getUserContestBadge(username);

    return {
      username,
      userRating: rating,
      userBadge: badgeName,
      userGlobalRanking: userRank,
    };
  } catch (error) {
    console.error(error.message);
    throw new Error(`Failed to find user with rank: ${userRank}`);
  }
};

export default getUserInfo;
