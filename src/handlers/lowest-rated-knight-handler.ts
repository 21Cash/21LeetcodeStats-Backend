import getTotalParticipantsCount from "./total-participants-handler";
import getUserInfo from "./user-info-handler";

const getLowestRatedKnightUserInfo = async () => {
  console.log(`Searching For Lowest Rated Knight.`);
  let lowRank = 1;
  let highRank = await getTotalParticipantsCount();

  let bestUsername = "";
  let bestRating = null;
  let bestGlobalRanking = null;

  let iterations = 0;

  while (lowRank <= highRank) {
    const midRank = Math.floor((lowRank + highRank) / 2);
    iterations++;
    try {
      const userData = await getUserInfo(midRank);
      const { username, userBadge, userRating, userGlobalRanking } = userData;

      console.log(`low, high : ${lowRank}, ${highRank}`);

      if (userBadge === "Knight" || userBadge === "Guardian") {
        bestUsername = username;
        bestRating = userRating;
        lowRank = midRank + 1;
        bestGlobalRanking = userGlobalRanking;
      } else {
        highRank = midRank - 1;
      }
    } catch (error) {
      console.error(
        `Error fetching user info for rank ${midRank}: ${error.message}`
      );
      lowRank++;
    }
  }

  console.log(`total iterations for Knight : ${iterations}`);

  const data = {
    username: bestUsername,
    userRating: bestRating,
    userGlobalRanking: bestGlobalRanking,
  };

  return data;
};

export default getLowestRatedKnightUserInfo;
