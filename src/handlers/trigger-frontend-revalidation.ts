const revalidateFrontendRoute = async (revalidateRoute: String) => {
  const frontendUrl = process.env.FRONTEND_URL;
  const frontendRevalidationSecretKey =
    process.env.FRONTEND_REVALIDATION_SECRET_KEY;
  const url = `${frontendUrl}/api/revalidate-path?route=${revalidateRoute}&secretKey=${frontendRevalidationSecretKey}`;

  console.log(`Hit Route: ${url}`);
  try {
    const response = await fetch(url, { method: "GET" });
    const data = await response.json();
    if (response.ok) {
      console.log(
        `Revalidation Successful for route ${revalidateRoute}, responseData: ${JSON.stringify(
          data
        )} status: ${response.status}`
      );
    } else {
      console.error(
        `Revalidation Failed for route ${revalidateRoute}, response: ${JSON.stringify(
          data
        )}status: ${response.status}`
      );
    }
  } catch (err) {
    console.error(
      `Internal Server error, Revalidation Failed for route ${revalidateRoute}, error: ${err}`
    );
  }
};

export default revalidateFrontendRoute;
