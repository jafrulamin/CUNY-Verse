// Homepage search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchBar = document.getElementById('searchBar');
    const searchButton = document.querySelector('.search-button');
    const eventCards = document.querySelectorAll('.event-card');

    // Search function
    function searchEvents() {
        const searchTerm = searchBar.value.toLowerCase().trim();
        
        eventCards.forEach(card => {
            const eventName = card.querySelector('h3').textContent.toLowerCase();
            const eventDate = card.querySelector('.event-date').textContent.toLowerCase();
            const eventDescription = card.querySelector('.event-description').textContent.toLowerCase();
            
            // Check if search term matches any part of the event
            if (eventName.includes(searchTerm) || 
                eventDate.includes(searchTerm) || 
                eventDescription.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });

        // If search is empty, show all events
        if (searchTerm === '') {
            eventCards.forEach(card => {
                card.style.display = 'block';
            });
        }
    }

    // Event listeners
    searchBar.addEventListener('input', searchEvents);
    searchBar.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            searchEvents();
        }
    });
    searchButton.addEventListener('click', searchEvents);

    // Handle clicking on event cards
    eventCards.forEach(card => {
        const learnMoreLink = card.querySelector('.learn-more');
        const eventName = card.getAttribute('data-event');
        
        // Store the selected event name when clicking "Learn more and RSVP"
        learnMoreLink.addEventListener('click', function(e) {
            localStorage.setItem('selectedEvent', eventName);
        });
    });

    // Clear search on page load
    searchBar.value = '';
});
