const handleSignIn = (req, res, db, bcrypt) => {
  const { name, password } = req.body;
  const row = db.prepare('SELECT * FROM users WHERE name=?').get(name);
  if (row) {
    bcrypt.compare(password, row.password, (err, result) => {
      if (result) {
        res.json(row);
      } else {
        console.log(err);
        res.json('failure');
      }
    });
  } else {
    res.json('failure');
  }
};

module.exports = {
  handleSignIn: handleSignIn,
};
