function displayActivityInfo() {
    //get docID from URL:
    let params = new URL( window.location.href ); 
    let ID = params.searchParams.get( "docID" );
    console.log( ID );

    db.collection( "Activities" )
        .doc( ID )
        .get()
        .then( doc => {
            thisActivity = doc.data();
            ActivityName = doc.data().title;
            description = doc.data().description;
            dateTime = doc.data().datetime;
            activityLocation = doc.data().location;
            
            document.getElementById( "activity_title" ).innerHTML = ActivityName;
            document.getElementById( "description" ).innerHTML = description;
            document.getElementById( "dateTime" ).innerHTML = "Date and Time: " + dateTime;
            document.getElementById( "location" ).innerHTML = "Location: " + activityLocation;
           
        } );
}
displayActivityInfo();