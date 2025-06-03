const Project = require('../models/project');

// @desc    Get all projects
// @route   GET /api/projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort('-date');
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Add new project
// @route   POST /api/projects
exports.addProject = async (req, res) => {
  const { title, description, technologies, imageUrl, projectUrl, githubUrl, featured } = req.body;

  try {
    const newProject = new Project({
      title,
      description,
      technologies,
      imageUrl,
      projectUrl,
      githubUrl,
      featured
    });

    const project = await newProject.save();
    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};