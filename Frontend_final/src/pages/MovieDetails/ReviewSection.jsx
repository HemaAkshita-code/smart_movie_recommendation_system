import { useDispatch, useSelector } from "react-redux";
import { ReviewEditor } from "../../components/review/ReviewEditor";
import { submitReview } from "../../redux/reviews/reviewSlice";

const ReviewSection = ({ movieId }) => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.reviews);

  const handleReviewSubmit = async ({ rating, text, isSpoiler }) => {
    const result = await dispatch(submitReview({ movieId, rating, text, isSpoiler }));
    if (submitReview.fulfilled.match(result)) {
      // success — maybe show a toast, or clear form via key remount
    }
  };

  return (
    <div>
      <ReviewEditor onSubmit={handleReviewSubmit} submitLabel="Post Review" />
      {status === "failed" && <p className="text-sm text-destructive mt-2">{error}</p>}
    </div>
  );
};

export default ReviewSection;