import getTotalParticipantsCount from "./total-participants-handler";
import getUserInfo from "./user-info-handler";

const getLowestRatedGuardianUserInfo = async () => {
  console.log(
    `================================== GUARDIAN SEARCH BEGIN ================================================`
  );
  let lowRank = 1;
  let highRank = await getTotalParticipantsCount();

  let bestUsername = "";
  let bestRating = 999999;
  let bestGlobalRanking = null;

  let iterations = 0;

  while (lowRank <= highRank) {
    const midRank = Math.floor((lowRank + highRank) / 2);

    console.log(
      `\n------------------------Iteration : ${iterations}--------------------------------`
    );
    console.log(`Low, High : ${lowRank}, ${highRank}`);
    iterations++;
    try {
      const userData = await getUserInfo(midRank);
      const { username, userBadge, userRating, userGlobalRanking } = userData;
      console.log(JSON.stringify(userData));
      if (userBadge === "Guardian") {
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

  const data = {
    username: bestUsername,
    userRating: bestRating,
    userGlobalRanking: bestGlobalRanking,
  };

  console.log(`total iterations for guardian : ${iterations}`);

  console.log(`Best Guardian Info ${JSON.stringify(data)}`);

  console.log(
    `================================== GUARDIAN SEARCH END ================================================`
  );
  return data;
};

export default getLowestRatedGuardianUserInfo;
