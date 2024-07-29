 // Populate days
 const daySelect = document.getElementById('inputDay');
 for (let i = 1; i <= 31; i++) {
     const option = document.createElement('option');
     option.value = i;
     option.textContent = i;
     daySelect.appendChild(option);
 }

 // Populate months
 const monthSelect = document.getElementById('inputMonth');
 const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
 monthNames.forEach((month, index) => {
     const option = document.createElement('option');
     option.value = index + 1;
     option.textContent = month;
     monthSelect.appendChild(option);
 });

 // Populate years
 const yearSelect = document.getElementById('inputYear');
 const currentYear = new Date().getFullYear();
 for (let i = currentYear; i >= 1900; i--) {
     const option = document.createElement('option');
     option.value = i;
     option.textContent = i;
     yearSelect.appendChild(option);
 }