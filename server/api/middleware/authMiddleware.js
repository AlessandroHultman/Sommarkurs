import jwt from "jsonwebtoken";

const requrieAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'ecommercewebapi', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect('/');
  }
}

// check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'ecommercewebapi', async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};


export default { requrieAuth, checkUser };
