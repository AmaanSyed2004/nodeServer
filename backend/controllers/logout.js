const logout = (req, res) => {
  try {
    if (!req.cookies.authToken){
        return res.status(404).json({message: "No Cookie found"})
    }
    res.clearCookie("authToken");
    res.status(200).json({ message: "Logged out successfully!" });
  } catch (e) {
    res.status(500).json({ message: "Server Error" });
  }
};
module.exports = logout;
