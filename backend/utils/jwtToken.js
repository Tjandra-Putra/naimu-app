// create token and save in cookies
const sendToken = (user, statusCode, res) => {
  const token = user.getJwtToken();

  // options for cookie
  const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
    httpOnly: true,
    secure: true, // only sent over a secure (HTTPS) connection
    // domain: process.env.NODE_ENV !== "PRODUCTION" ? "localhost" : "https://naimu-app.vercel.app",
    // sameSite: "None", // explicitly set the SameSite attribute to "None"
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
