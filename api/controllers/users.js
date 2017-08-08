import passport from 'passport';
import jwt from 'jsonwebtoken';

import User from '../models/user';
const secret = '7x0jhxt&quot;9(thpX6';

// lean gives json instead of mongo docobject
export const userIndex = (req, res, next) => (
  User.find().lean().exec((err, users) => {
    return (
      res.json({ users })
    );
  })
);

// export const register = (req, res, next) => (
//   User.register(new User({ username: req.body.username }), req.body.password, (err, user) => (
//     err ? res.status(400).send({error: "Email address in use"}) : res.status(200).send({user:user.id})
//   ))
// )

export const register = (req, res, next) => {
  User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
    if (err) {
      return res.status(401).json({ error: 'Email address in use' });
    }
    else {
      return res
        .status(200)
        .json(getToken(user));
    }
  }
);
};

//
// export const login = (req, res, next) => {
//   passport.authenticate('local', (err, user, info) => {
//     if (err) {
//       return next(err);
//     }
//     if (!user) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }
//     if (user) {
//       const token = jwt.sign({ id: user._id, username: user.username }, secret);
//       return res
//         .status(200)
//         .json({ token });
//     }
//   })(req, res, next);
// };

export const login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    if (user) {
      return res
        .status(200)
        .json(JSON.parse(getToken(user)));
    }
  })(req, res, next);
};

export const getToken = (user) => {
    const token = jwt.sign({ id: user._id, username: user.username }, secret);
    return {token};
};
