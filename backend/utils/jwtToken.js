// create token and save in cookies
const sendToken = (user, statusCode, res) => {
  const token = user.getJwtToken();

  // options for cookie
  const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
    httpOnly: true,
    domain: process.env.NODE_ENV !== "PRODUCTION" ? "http://localhost:3000" : "https://naimu-app.vercel.app", // Set the domain to match your frontend domain
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
