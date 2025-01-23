document.addEventListener('DOMContentLoaded', function() { 
    const bodyElement = document.querySelector('body');
    const type = bodyElement.getAttribute('data-type');
    const skill = bodyElement.getAttribute('data-skill');
    const customerId = bodyElement.getAttribute('data-customer-id');

    fetch(`../PHP%20files/fetch_workers.php?type=${type}&skill=${skill}`)
        .then(response => response.json())
        .then(data => {
            const profileContainer = document.getElementById('profileContainer');
            profileContainer.innerHTML = '';

            if (data.status === 'success') {
                data.workers.forEach(worker => {
                    const profileCard = document.createElement('div');
                    profileCard.className = 'profile-card';

                    const profileImage = document.createElement('img');
                    profileImage.src = worker.profile_image;
                    profileImage.alt = worker.fullname;

                    const profileName = document.createElement('h3');
                    profileName.textContent = worker.fullname;

                    const profileAddress = document.createElement('p');
                    profileAddress.textContent = worker.address;

                    const profileExperience = document.createElement('p');
                    profileExperience.textContent = `Experience: ${worker.experience}`;
                   // Inside the data.workers.forEach(worker => { ... }); loop

                    // Create a div for experience
                    /*const experienceDiv = document.createElement('div');
                    experienceDiv.textContent = worker.experience; // Replace this with the actual experience text
                    profileCard.appendChild(experienceDiv);*/

                    // Create Read More button
                    const readMoreButton = document.createElement('button');
                    readMoreButton.textContent = 'Read More';
                    readMoreButton.className = 'read-more-button';
                    profileCard.appendChild(readMoreButton);

                    // Set button event listener to redirect to the experience page
                    readMoreButton.addEventListener('click', function() {
                        // Redirect to the experience page with worker ID as a query parameter
                        window.location.href = `../PHP%20files/fetch_experience.php?worker_id=${worker.id}`;
                    });

                    // Toggle experience details on button click
                   /* readMoreButton.addEventListener('click', function() {
                        if (experienceDetails.style.display === 'none') {
                            experienceDetails.style.display = 'block';
                            readMoreButton.textContent = 'Show Less';
                        } else {
                            experienceDetails.style.display = 'none';
                            readMoreButton.textContent = 'Read More';
                        }
                    });*/
                    profileCard.appendChild(profileImage);
                    profileCard.appendChild(profileName);
                    profileCard.appendChild(profileAddress);
                    profileCard.appendChild(profileExperience);

                    // Rating stars (view-only)
                    const ratingContainer = document.createElement('div');
                    ratingContainer.className = 'rating-view-only';
                    const rating = worker.rating ? worker.rating : 0;

                    for (let i = 1; i <= 5; i++) {
                        const star = document.createElement('span');
                        star.className = 'star';
                        star.textContent = '★';
                        if (i <= rating) {
                            star.classList.add('filled');
                        }
                        ratingContainer.appendChild(star);
                    }

                    profileCard.appendChild(ratingContainer);

                    // Contact/Book Now button
                    const contactButton = document.createElement('a');
                    contactButton.textContent = 'Contact Now';
                    contactButton.className = 'contact-button';
                    contactButton.href = `../PHP%20files/chat.php?worker_id=${worker.id}&customer_id=${customerId}`;
                    profileCard.appendChild(contactButton);

                    // Availability toggle button and checkbox
                    const availabilityToggle = document.createElement('button');
                    availabilityToggle.textContent = worker.availability ? 'Available' : 'Not Available';
                    availabilityToggle.className = 'availability-toggle';
                    if (!worker.availability) {
                        availabilityToggle.classList.add('not-available');
                    }
                    profileCard.appendChild(availabilityToggle);

                    const availabilityCheckbox = document.createElement('input');
                    availabilityCheckbox.type = 'checkbox';
                    availabilityCheckbox.checked = worker.availability;
                    availabilityCheckbox.className = 'availability-checkbox';
                    profileCard.appendChild(availabilityCheckbox);

                    // Enable availability toggle if logged-in user is the owner of the profile
                    if (worker.is_logged_in_user) {
                        availabilityToggle.disabled = false;
                        availabilityToggle.addEventListener('click', function() {
                            worker.availability = !worker.availability;
                            availabilityToggle.textContent = worker.availability ? 'Available' : 'Not Available';
                            availabilityCheckbox.checked = worker.availability;

                            if (!worker.availability) {
                                availabilityToggle.classList.add('not-available');
                            } else {
                                availabilityToggle.classList.remove('not-available');
                            }

                            // Update availability in database
                            fetch('../PHP%20files/update_availability.php', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    worker_id: worker.id,
                                    availability: worker.availability
                                })
                            })
                            .then(response => response.json())
                            .then(data => {
                                if (data.status === 'error') {
                                    console.error('Error updating availability:', data.message);
                                }
                            });
                        });

                        availabilityCheckbox.addEventListener('click', function(event) {
                            event.stopPropagation();
                            worker.availability = availabilityCheckbox.checked;
                            availabilityToggle.textContent = worker.availability ? 'Available' : 'Not Available';

                            if (!worker.availability) {
                                availabilityToggle.classList.add('not-available');
                            } else {
                                availabilityToggle.classList.remove('not-available');
                            }

                            // Update availability in database
                            fetch('../PHP%20files/update_availability.php', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    worker_id: worker.id,
                                    availability: worker.availability
                                })
                            })
                            .then(response => response.json())
                            .then(data => {
                                if (data.status === 'error') {
                                    console.error('Error updating availability:', data.message);
                                }
                            });
                        });
                    } else {
                        availabilityToggle.disabled = true;
                        availabilityCheckbox.disabled = true;
                    }

                    profileContainer.appendChild(profileCard);
                });
            } else {
                profileContainer.textContent = 'No workers found for the selected type and skill.';
            }
        })
        .catch(error => {
            console.error('Error fetching worker profiles:', error);
            profileContainer.textContent = 'An error occurred while fetching worker profiles.';
        
            /*function showExperienceTable(experienceData) {
            const experienceTable = document.createElement('table');
            experienceTable.className = 'experience-table';
            const headerRow = document.createElement('tr');
            headerRow.innerHTML = '<th>Experience Years</th><th>Experience Address</th>';
            experienceTable.appendChild(headerRow);
        
            experienceData.forEach(exp => {
                const row = document.createElement('tr');
                row.innerHTML = `<td>${exp.experience_years}</td><td>${exp.experience_address}</td>`;
                experienceTable.appendChild(row);
            });
        
            // Display the table
            const tableContainer = document.getElementById('experienceTableContainer');
            tableContainer.innerHTML = ''; // Clear previous table
            tableContainer.appendChild(experienceTable);
        }*/
    });
});
