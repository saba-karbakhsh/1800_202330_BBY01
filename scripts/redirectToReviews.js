document.getElementById("commentsButton").addEventListener("click", function() {
    // Redirect to see_reviews.html with the activityID as a query parameter
    window.location.href = "see_reviews.html?docID=" + currentActivityId;
});
