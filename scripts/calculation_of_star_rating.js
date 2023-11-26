function getStarRating() {
    let params = new URL(window.location.href);
    let activityID = params.searchParams.get("docID");
    let one_star = 0;
    let two_star = 0;
    let three_star = 0;
    let four_star = 0;
    let five_star = 0;
    let reviewers = 0;
    db.collection("Activities").get().then(activities => {
        activities.forEach(activityInfo => {
            db.collection("reviews").get().then(reviews => {
                reviews.forEach(reviewInfo => {
                    activityDocID = reviewInfo.data().activityDocID;
                    if (activityInfo.id == activityDocID) {
                        reviewers++;

                        if (reviewInfo.data().rating == 1) {
                            one_star++;
                        } else if (reviewInfo.data().rating == 2) {
                            two_star++;
                        } else if (reviewInfo.data().rating == 3) {
                            three_star++;
                        } else if (reviewInfo.data().rating == 4) {
                            four_star++;
                        } else if (reviewInfo.data().rating == 5) {
                            five_star++;
                        }
                    }

                });
                //console.log( activityID );
                average = ((one_star) + (two_star * 2) + (three_star * 3) + (four_star * 4) + (five_star * 5)) / reviewers;
                if (activityID == activityInfo.id) {

                    document.getElementById("starRating").innerHTML = "Average rating: " + Number(average).toFixed(1); 
                    for (let i = 1; i <= Math.ceil(average); i++) {
                        document.getElementById(`star${i}`).textContent = 'star';
                        if (Math.round(average) != average && i == Math.ceil(average)) {
                            document.getElementById(`star${i}`).textContent = 'star_half';
                        }
                    }
                }
                console.log(activityInfo.id + " l " + average);
                reviewers = 0;
                one_star = 0;
                two_star = 0;
                three_star = 0;
                four_star = 0;
                five_star = 0;
            })



        })

    })
}
getStarRating();