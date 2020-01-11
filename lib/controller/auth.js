const handler = require('../middleware/handler');
const ErrorMessage = require('../utils/errorMessage');
const sendEmail = require('../utils/sendEmail');
const User = require('../models/User');

exports.signup = handler(async(req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password
  });
  sendTokenResponse(user, 200, res);
});

exports.login = handler(async(req, res, next) => {
  const { email, password } = req.body;
  if(!email || !password) {
    return next(new ErrorMessage('Please enter a email or password', 400));
  }
  const user = await User.findOne({ email }).select('+password');
  if(!user) {
    return next(new ErrorMessage('invalid email or password', 401));
  }
  const isMatch = await user.matchPassword(password);
  if(!isMatch) {
    return next(new ErrorMessage('invalid email or password', 401));
  }
  sendTokenResponse(user, 200, res);
  
});
// current logged in user
exports.getMe = handler(async(req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    data: user
  });
});
// forgot password
exports.forgotPassword = handler(async(req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
 
  if(!user) {
    return next(new ErrorMessage('there is no email with that user', 404));
  }
  const resetToken = user.getResetPasswordToken();
  
  await user.save({ validateBeforeSave: false });
  const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/resetpassword/${resetToken}`;

  const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'password reset token',
      message
    });
    res.status(200).json({ success: true, data: 'email sent' });
  } catch(err) {
    console.log(err);
    user.getResetPasswordToken = undefined;
    user.getResetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorMessage('email could not be sent', 500));
  }
  res.status(200).json({
    success: true,
    data: user
  });
});
// create cookie
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true
  };
  if(process.env.NODE_ENV === 'public') {
    options.secure = true;
  }
  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token
    });
};



