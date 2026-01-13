import mongoose from 'mongoose'

const connectString =
  'mongodb+srv://nguyenhuyhoangduc4513_db_user:skKjN8oqX7SRER3k@cluster0.pqdmdwl.mongodb.net/?appName=Cluster0'

const connectDB = mongoose
  .connect(connectString)
  .then((_) => console.log('Connected MongoDB Success'))
  .catch((err) => console.log('Error Connect'))

//dev
if (1 === 1) {
  mongoose.set('debug', true)
  mongoose.set('debug', { color: true })
}

export default connectDB
