document.addEventListener('DOMContentLoaded', async function () {
    const participantsList = document.getElementById('participantsList');
    const firestore = firebase.firestore();
 
    
    const urlParams = new URLSearchParams(window.location.search);
    const currentActivityId = urlParams.get('docID');

    const activityRef = firestore.collection("Activities").doc(currentActivityId);
    const participantsRef = activityRef.collection("participants");
    
 
    try {
        // Get participants data from Firestore
        const querySnapshot = await participantsRef.get();
        
        querySnapshot.forEach(doc => {
               
            const participant = doc.data();
 
            // Create a list item
            const listItem = document.createElement('li');

            listItem.setAttribute("class" , "list-group-item");
            
            // Create a link for each participant with the user ID in the URL
            const participantLink = document.createElement('a');
            participantLink.href = `user_home_page.html?userId=${doc.id}`;
            participantLink.innerText = participant.name; // Replace with the actual field name
 
            // Append the link to the list item
            listItem.appendChild(participantLink);
 
            // Append the list item to the participants list
            participantsList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching participants:', error);
    }
 });
 