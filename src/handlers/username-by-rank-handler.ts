import { getClistPageIndex } from "../Utils/utils";
import { JSDOM } from "jsdom";

const getUsernameByRank = async (userRank: number): Promise<string> => {
  if (isNaN(userRank) || userRank <= 0) {
    throw new Error("Invalid user rank. Must be a positive number.");
  }

  const pageIndex = getClistPageIndex(userRank);
  const apiUrl = `https://clist.by/resource/leetcode.com/?country=&period=all&top_page=${pageIndex}&querystring_key=top_page`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const html = await response.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;
    const rows = document.querySelectorAll("tr");

    for (const row of rows) {
      const rankElement = row.querySelector("td:nth-child(1)");
      const usernameElement = row.querySelector(".inline-button a");

      if (rankElement && usernameElement) {
        const rankText = rankElement.textContent;
        if (rankText) {
          const rank = parseInt(rankText.trim(), 10);

          const usernameLink = usernameElement as HTMLAnchorElement;
          const username = usernameLink.href.split("/u/")[1].split("/")[0];

          if (rank === userRank) {
            return username;
          }
        }
      }
    }

    throw new Error(`Username not found for rank ${userRank}`);
  } catch (error) {
    console.error("Error fetching or processing data:", error);
    throw error;
  }
};

export default getUsernameByRank;
