const handleRegister = (req, res, db, bcrypt, saltRounds) => {
  const { name, password } = req.body;
  // unavailable is defined only if username already taken
  const unavailable = db.prepare('SELECT * FROM users WHERE name=?').get(name);
  if (unavailable) {
    res.json('failure');
  } else {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        console.log(err);
        res.json('failure in crypto function');
      }
      db.prepare('INSERT INTO users(name, password) VALUES (?, ?)').run(name, hash);
      res.json('success');
    });
  }
};

module.exports = {
  handleRegister: handleRegister,
};
