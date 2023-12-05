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
            
            //convert the dates to a Date object then convert to UTC string
            var localDate = new Date(dateTime);
            var dateString = localDate.toUTCString();

            //Store the time to add in AM and PM
            var newDateTime = localDate.toLocaleTimeString();
            // split the strings between the first half and the half after "GMT"
            var newStringDate = dateString.split(" ");
            var day = newStringDate[0]
            var month = newStringDate[2];
            var monthNum = newStringDate[1];
            var year = newStringDate[3];

            var dateFormat = day + " " + month + " " +  monthNum  + " " + year;

            document.getElementById( "activity_title" ).innerHTML = ActivityName;
            document.getElementById( "description" ).innerHTML = description;
            document.getElementById( "dateTime" ).innerHTML = "Date and Time: " + dateFormat;
            document.getElementById( "location" ).innerHTML = "Location: " + activityLocation;
           
        } );
}
displayActivityInfo();