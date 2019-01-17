var handlers = {}

handlers.isAdmin = (req, res, next) => { isRole(req, res, next, 'ADMIN'); }
handlers.isWriter = (req, res, next) => { isRole(req, res, next, 'WRITER'); }

function isRole(req, res, next, tRole) {
  if (req.isAuthenticated() && req.user && req.user.role == tRole) {
    next();
  } else {
    res.status(401).send('Unauthorize');
  }
}

module.exports = handlers;