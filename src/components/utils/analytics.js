export const logToNLevelAnalytics = async (action) => {
  const url = "https://api.nlevelsoftware.com/analytics";
  const propKey = "0ynKMoKXFY2GuI2oIz9rSaBVWbX0NIak7fsV7wcJ";
  const accountId = "o16efmpht7"; // Replace with your actual account ID
  const timestamp = Math.floor(Date.now() / 1000); // Current Unix timestamp
  const area = action ?? "https://chat-staging.positive-intentions.com"; // Replace with the URL of the webpage

  const data = {
    accountId: accountId,
    eventCategory: "pageview",
    timestamp: timestamp,
    area: area,
  };

  try {
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": propKey,
      },
      body: JSON.stringify(data),
    });

    // if (response.ok) {
    //   console.log('Analytics sent successfully.');
    // } else {
    //   console.log('Analytics failed with status:', response.status);
    // }
  } catch (error) {
    // console.log('Analytics failed:', error);
  }
};
