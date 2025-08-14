// membership.js - Handle membership form submission and API requests

document.addEventListener('DOMContentLoaded', function() {
    const membershipForm = document.getElementById('membershipForm');
    const loadingSpinner = document.getElementById('loadingSpinner');
    
    // Toggle fields based on membership tier
    window.toggleFields = function() {
        const tier = document.getElementById('membershipTier').value;
    const isStudent = tier === 'Student';

    const toggleGroup = (groupId, inputId, show) => {
        const group = document.getElementById(groupId);
        const input = document.getElementById(inputId);

        if (group && input) {
            group.style.display = show ? 'block' : 'none';
            input.disabled = !show; // Disable if hidden
        }
    };

    toggleGroup('fathersNameGroup', 'fathersName', isStudent);
    toggleGroup('batchGroup', 'batch', isStudent);
    toggleGroup('enrollmentNumberGroup', 'enrollmentNumber', isStudent);
    toggleGroup('yearGroup', 'year', isStudent);
    toggleGroup('semesterGroup', 'semester', isStudent);
};
    
    // Initialize form state
    toggleFields();
    
    // Form submission handler
    membershipForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Reset errors
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
        
        // Show loading spinner
        loadingSpinner.style.display = 'flex';
        
        try {
            // Collect form data
            const formData = new FormData(membershipForm);
            let data = Object.fromEntries(formData.entries());
            
            // Convert availability radio buttons to single value
            const availability = document.querySelector('input[name="availability"]:checked');
            data.availability = availability ? availability.value : '';
            
            // Convert checkbox to boolean string
            data.acceptTerms = document.getElementById('acceptTerms').checked.toString();
            
            // Add default values for professional tier
            if (data.membershipTier === 'Professional') {
                data.fathersName =  'Not Available';
                data.batch ='Not Available';
                data.enrollmentNumber = 'Not Available';
                data.year =  'Not Available';
                data.semester ='Not Available';
            }
            
            // Validate required fields
            const errors = validateForm(data);
            if (Object.keys(errors).length > 0) {
                showErrors(errors);
                loadingSpinner.style.display = 'none';
                return;
            }
            
            // Send API request
            const response = await fetch('https://aairosociety.com/ApI/membership', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            if (response.ok) {
                // Success
                alert('Membership application submitted successfully!');
                membershipForm.reset();
                toggleFields(); // Reset field visibility
            } else {
                // Handle server errors
                const errorData = await response.json();
                alert(`Error: ${errorData.message || 'Failed to submit application'}`);
            }
        } catch (error) {
            // Handle network errors
            console.error('Error submitting form:', error);
            alert('Network error. Please try again later.');
        } finally {
            // Hide loading spinner
            loadingSpinner.style.display = 'none';
        }
    });
    
    // Form validation
    function validateForm(data) {
        const errors = {};
        
        // Check required fields
        const requiredFields = [
            'membershipTier', 'fullName', 'phone', 'email', 'programme', 
            'branch', 'availability', 'acceptTerms'
        ];
        
        // Add student-specific required fields
        if (data.membershipTier === 'Student') {
            requiredFields.push(
                'fathersName', 'batch', 'enrollmentNumber', 'year', 'semester'
            );
        }
        
        requiredFields.forEach(field => {
            if (!data[field]) {
                errors[`${field}Error`] = `${getFieldLabel(field)} is required`;
            }
        });
        
        // Validate email format
        if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            errors.emailError = 'Please enter a valid email address';
        }
        
        // Validate phone number
        if (data.phone && !/^[0-9]{10,15}$/.test(data.phone)) {
            errors.phoneError = 'Please enter a valid phone number (10-15 digits)';
        }
        
        // Validate terms acceptance
        if (!data.acceptTerms || data.acceptTerms !== 'true') {
            errors.acceptTermsError = 'You must accept the terms and conditions';
        }
        
        return errors;
    }
    
    // Get field label for error messages
    function getFieldLabel(field) {
        const labels = {
            membershipTier: 'Membership tier',
            fullName: 'Full name',
            fathersName: 'Father\'s name',
            batch: 'Batch',
            enrollmentNumber: 'Enrollment number',
            programme: 'Programme',
            branch: 'Branch',
            year: 'Year',
            semester: 'Semester',
            phone: 'Contact number',
            email: 'Email address',
            availability: 'Availability',
            acceptTerms: 'Terms and conditions'
        };
        
        return labels[field] || field;
    }
    
    // Display validation errors
    function showErrors(errors) {
        Object.entries(errors).forEach(([field, message]) => {
            const errorElement = document.getElementById(field);
            if (errorElement) {
                errorElement.textContent = message;
            }
        });
    }
});