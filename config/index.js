module.exports = {
  port: process.env.PORT || 7890,
  mongo_uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/instaclone',
  secret: process.env.SECRET || 'Coding'
}