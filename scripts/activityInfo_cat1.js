//Function to display activity cards for category 1
function displayCardsDynamically(collection) {

    // Retrieve the HTML element with the ID "activityCardTemplate" and store it in the cardTemplate variable.
    let cardTemplate = document.getElementById("activityCardTemplate");  

    //Go into collection called "Activities"
    db.collection(collection).get()   
        .then(allActivities => {

            //iterate thru each doc and get values:
            allActivities.forEach(doc => { 
                var title = doc.data().title;
                var description = doc.data().description;
                var datetime = doc.data().datetime;
                var location = doc.data().location;
                var category =  doc.data().category; 
                var docID = doc.id;
                // Clone the HTML template to create a new card (newCard) that will be filled with Firestore data.
                let newCard = cardTemplate.content.cloneNode(true); 
               
                //update title and location and description
                newCard.querySelector('.card-title').innerHTML = title;
                newCard.querySelector('.card-location').innerHTML = location;
                newCard.querySelector('.card-text').innerHTML = description;
                newCard.querySelector('a').href = "eachActivity.html?docID=" + docID;

                //Add activity card to category template:"
                if (category == "Hiking/Camping"){
                    document.getElementById(collection + "-go-here-" + category).appendChild(newCard);
                }
            })
        })
}

//Display cards:
displayCardsDynamically("Activities");