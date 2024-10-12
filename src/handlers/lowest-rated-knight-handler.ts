import getTotalParticipantsCount from "./total-participants-handler";
import getUserInfo from "./user-info-handler";

const getLowestRatedKnightUserInfo = async () => {
  console.log(
    `================================== KNIGHT SEARCH BEGIN ================================================`
  );
  let lowRank = 1;
  let highRank = await getTotalParticipantsCount();

  let bestUsername = "";
  let bestRating = 9999999;
  let bestGlobalRanking = 0;

  let iterations = 0;

  while (lowRank <= highRank) {
    const midRank = Math.floor((lowRank + highRank) / 2);
    iterations++;

    console.log(
      `\n------------------------Iteration : ${iterations}--------------------------------`
    );
    console.log(`Low, High : ${lowRank}, ${highRank}`);
    try {
      const userData = await getUserInfo(midRank);
      const { username, userBadge, userRating, userGlobalRanking } = userData;

      console.log(`low, high : ${lowRank}, ${highRank}`);
      console.log(JSON.stringify(userData));
      if (userBadge === "Knight" || userBadge === "Guardian") {
        if (userRating <= bestRating) {
          bestUsername = username;
          bestRating = userRating;
          bestGlobalRanking = userGlobalRanking;
        }
        lowRank = midRank + 1;
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

  console.log(`total iterations for Knight : ${iterations}`);
  console.log(`Best Knight Info ${JSON.stringify(data)}`);

  console.log(
    `================================== KNIGHT SEARCH END ================================================`
  );
  return data;
};

export default getLowestRatedKnightUserInfo;
