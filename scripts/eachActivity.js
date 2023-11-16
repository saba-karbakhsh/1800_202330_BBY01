function displayActivityInfo() {
    let params = new URL( window.location.href ); //get URL of search bar
    let ID = params.searchParams.get( "docID" ); //get value for key "id"
    console.log( ID );

    db.collection( "Activities" )
        .doc( ID )
        .get()
        .then( doc => {
            thisActivity = doc.data();
            hikeName = doc.data().title;
            description = doc.data().description;
            dateTime = doc.data().datetime;
            activityLocation = doc.data().location;
            
            document.getElementById( "activity_title" ).innerHTML = hikeName;
            document.getElementById( "description" ).innerHTML = description;
            document.getElementById( "dateTime" ).innerHTML = "Date and Time: " + dateTime;
            document.getElementById( "location" ).innerHTML = "Location: " + activityLocation;
           
        } );
}
displayActivityInfo();