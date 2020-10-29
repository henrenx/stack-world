const multer = require('multer');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const mongoose = require('mongoose');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img/users');
  },
  filename: (req, file, cb) => {
    // user-ididid-3333333.jpeg
    const ext = file.mimetype.split('/')[1];
    cb(null, `user-${req.userId}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image!', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single('photo');

exports.getAllUsers = catchAsync(async (req, res) => {
  let filter = {};
  if (req.params.courseId)
    filter = { buyCourses: { $elemMatch: { course: req.params.courseId } } };
  console.log(filter);
  const users = await User.find(filter).select('email');

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});
exports.getUser = catchAsync(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    //course.findOne({_id:req.params.id});

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(404).json({ status: 'fail', message: err });
  }
});
exports.createUser = catchAsync(async (req, res) => {
  // Allow nested routes
  if (!req.body.buyCourses && !req.body.createdCourse) {
    const newUser = await User.create(req.body);
  } else if (req.body.buyCourses) {
    const selected = await User.buyCourses.push(req.body.buyCourses[0]);
  } else {
  }
  // if (!req.body.user) req.body.user = req.user.id;

  res.status(201).json({
    status: 'success',
    data: {
      selected,
    },
  });
});

exports.updateUserRecords = catchAsync(async (req, res) => {
  const newRecords = await User.findByIdAndUpdate(req.params.id, {
    $push: {
      buyCourses: { course: req.body.buyCourses[0].course },
    },
  });

  res.status(201).json({
    status: 'success',
    data: {
      newRecords,
    },
  });
});

exports.updateMe = catchAsync(async (req, res) => {
  console.log(req.file);
  console.log(req.body);
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined!',
  });
});

exports.updateUser = catchAsync(async (req, res) => {
  // console.log(req.body);
  // console.log(req.params.id);
  const filter = { _id: req.params.id };
  const update = { 'buyCourses.course': req.body.byCourses[0].course };
  try {
    const user = await Course.findOneAndUpdate(filter, update, {
      new: true,
      // runValidators: true,
    });
    res.status(200).json({
      status: 'scccess',
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(404).json({ status: 'fail', message: err });
  }
});
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined!',
  });
};