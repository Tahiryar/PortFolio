const express = require('express');
const router = express.Router();
const { getProjects, addProject } = require('../controllers/projectController');
const auth = require('../middleware/auth');

router.route('/')
  .get(getProjects)
  .post(auth, addProject);

module.exports = router;