function displayCardsDynamically(collection) {
    let cardTemplate = document.getElementById("activityCardTemplate"); // Retrieve the HTML element with the ID "activityCardTemplate" and store it in the cardTemplate variable. 

    db.collection(collection).get()   //the collection called "Activities"
        .then(allActivities => {
            //var i = 1;  //Optional: if you want to have a unique ID for each hike
            allActivities.forEach(doc => { //iterate thru each doc
                var title = doc.data().title;       // get value of the "title" key
                var description = doc.data().description;  // get value of the "description" key
                var datetime = doc.data().datetime;    // get value of the "datetime" key
                var location = doc.data().location; // get value of the "location" key
                var category =  doc.data().category; // get value of the "category" key
                var docID = doc.id;
                let newCard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newCard) that will be filled with Firestore data.

                console.log(category);
                console.log(newCard);
                //update title and location and description
                newCard.querySelector('.card-title').innerHTML = title;
                newCard.querySelector('.card-location').innerHTML = location;
                newCard.querySelector('.card-text').innerHTML = description;
                newCard.querySelector('a').href = "eachActivity.html?docID=" + docID;

                //Optional: give unique ids to all elements for future use
                // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

                //attach to gallery"
                if (category == "Sports"){
                    document.getElementById(collection + "-go-here-" + category).appendChild(newCard);
                }

                //i++;   //Optional: iterate variable to serve as unique ID
            })
        })
}

displayCardsDynamically("Activities");  //input param is the name of the collection