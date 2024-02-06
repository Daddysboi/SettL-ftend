const fetch = require("node-fetch");

exports.handler = async (event, context) => {
  try {
    const response = await fetch("REACT_APP_PAYSTACK_PUBLIC_KEY", {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_PAYSTACK_PUBLIC_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error("Error in Netlify function:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
