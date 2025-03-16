import mongoose from "mongoose";

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  userId: { type: String, required: true }, 
  movieName: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 10 }, 
  reviewText: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});

const ReviewModel = mongoose.model('Reviews', reviewSchema);
export default ReviewModel;