// RSVP form handling
document.addEventListener('DOMContentLoaded', function() {
    const rsvpForm = document.getElementById('rsvpForm');
    const modal = document.getElementById('confirmationModal');
    const closeBtn = document.getElementsByClassName('close')[0];
    
    // Load saved RSVPs from localStorage
    let rsvps = JSON.parse(localStorage.getItem('rsvps')) || [];
    
    // Only add form event listener if form exists on the page
    if (rsvpForm) {
        // Check if there's a selected event from the homepage
        const selectedEvent = localStorage.getItem('selectedEvent');
        if (selectedEvent) {
            const eventField = document.getElementById('event');
            if (eventField) {
                eventField.value = selectedEvent;
            }
            // Clear the selected event after using it
            localStorage.removeItem('selectedEvent');
        }
        
        // Handle form submission
        rsvpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            id: Date.now(),
            name: document.getElementById('name').value,
            school: document.getElementById('school').value,
            email: document.getElementById('email').value,
            event: document.getElementById('event').value,
            guests: document.getElementById('guests').value,
            message: document.getElementById('message').value,
            timestamp: new Date().toLocaleString()
        };
        
        // Save to localStorage
        rsvps.push(formData);
        localStorage.setItem('rsvps', JSON.stringify(rsvps));
        
        // Show confirmation modal
        showConfirmation(formData);
        
            // Reset form
            rsvpForm.reset();
        });
    }
    
    // Show confirmation modal
    function showConfirmation(data) {
        const confirmationMessage = document.getElementById('confirmationMessage');
        confirmationMessage.innerHTML = `
            <p><strong>Thank you for your RSVP!</strong></p>
            <p>We have received your registration for:</p>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Event:</strong> ${data.event}</p>
            <p><strong>Number of Guests:</strong> ${data.guests}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p>A confirmation email will be sent to you shortly.</p>
        `;
        modal.style.display = 'block';
    }
    
    // Modal event listeners (only if modal exists)
    if (modal && closeBtn) {
        // Close modal when clicking X
        closeBtn.onclick = function() {
            modal.style.display = 'none';
        }
        
        // Close modal when clicking outside
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        }
    }
});

// Close modal function
function closeModal() {
    document.getElementById('confirmationModal').style.display = 'none';
}

// Function to get all RSVPs (for admin purposes)
function getAllRSVPs() {
    return JSON.parse(localStorage.getItem('rsvps')) || [];
}

// Function to clear all RSVPs (for admin purposes)
function clearAllRSVPs() {
    if (confirm('Are you sure you want to clear all RSVPs?')) {
        localStorage.removeItem('rsvps');
        alert('All RSVPs have been cleared.');
    }
}

// Function to export RSVPs as CSV (for admin purposes)
function exportRSVPsAsCSV() {
    const rsvps = getAllRSVPs();
    if (rsvps.length === 0) {
        alert('No RSVPs to export.');
        return;
    }
    
    // Create CSV content
    const headers = ['ID', 'Name', 'School', 'Email', 'Event', 'Guests', 'Message', 'Timestamp'];
    const csvContent = [
        headers.join(','),
        ...rsvps.map(rsvp => [
            rsvp.id,
            `"${rsvp.name}"`,
            `"${rsvp.school}"`,
            `"${rsvp.email}"`,
            `"${rsvp.event}"`,
            rsvp.guests,
            `"${rsvp.message || ''}"`,
            `"${rsvp.timestamp}"`
        ].join(','))
    ].join('\n');
    
    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rsvps_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// Add keyboard shortcuts for admin functions
document.addEventListener('keydown', function(e) {
    // Ctrl+Shift+E to export RSVPs
    if (e.ctrlKey && e.shiftKey && e.key === 'E') {
        exportRSVPsAsCSV();
    }
    // Ctrl+Shift+V to view all RSVPs in console
    if (e.ctrlKey && e.shiftKey && e.key === 'V') {
        console.table(getAllRSVPs());
    }
});
