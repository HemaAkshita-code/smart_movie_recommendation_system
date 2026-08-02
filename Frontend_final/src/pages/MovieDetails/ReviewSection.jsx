import { useDispatch, useSelector } from "react-redux";
import { ReviewEditor } from "../../components/review/ReviewEditor";
import { submitReview } from "../../redux/reviews/reviewSlice";

const ReviewSection = ({ movieId }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);

  const handleReviewSubmit = async ({ rating, text, isSpoiler }) => {
    const result = await dispatch(submitReview({
      userId: currentUser._id,
      movieId: movieId,
      rating: rating,
      reviewText: text,
      isSpoiler: isSpoiler,
    }));

    if (submitReview.fulfilled.match(result)) {
      alert("Review posted!");
    }
  };

  return <ReviewEditor onSubmit={handleReviewSubmit} submitLabel="Post Review" />;
};

export default ReviewSection;