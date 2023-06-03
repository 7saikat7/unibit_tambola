const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerHandler = async (req,res) => {

  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(401).json("All Fields Are Mandatory");
    } else {
      const userChecker = await User.findOne({ where: { email: email } });
      if (userChecker) {
        res.status(400).json("User Already Exist , Please Try Logging In");
        return;
      } else {
        const hashedPassword = await bcrypt.hash(password, 11);
        const user = await User.create({
          name: name,
          email: email,
          password: hashedPassword,
        });
        res.json("Created User Successfully !");
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
const allUserHandler = async (req, res) => {
  // handler For Checking All The User Exist In Out Database
  // api :/user [GET]
  // body: null

  try {
    const allUsers = await User.findAll();
    res.status(200).json(allUsers);
    return;
  } catch (error) {
    res.json(error);
  }
};

const loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) res.status(400).json("All Fields Are Mandatory ");
    else {
      const user = await User.findOne({ where: { email: email } });
      if(user==null || user.length==0){
        return res.json("User Does't Exist")
      }
      if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign(
          {
            user: {
              name: user.name,
              email: user.email,
              id: user.id,
            },
          },
          process.env.SECRET_ACCESS_TOKEN,
          { expiresIn: "3h" }
        );
        res.status(200).json({ accessToken , userId:user.userId});
        return;
      } else {
        return res.status(402).json("Username / Password Don't Match");
      }
      return res.status(400).json("User Doesn't Exist ");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};


module.exports = {
  registerHandler,
  allUserHandler,
  loginHandler,

};
