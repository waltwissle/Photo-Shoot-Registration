import React, { useState, useEffect } from 'react';
// No need to import Lucide icons if they're not working
import { AlertCircle, Camera, Check } from 'lucide-react';


const PhotoShootRegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    shootCategory: '',
    additionalContacts: [''],
    phoneNumber: '',
    notes: '',
  });
  
  const [photoCode, setPhotoCode] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate a unique 5-digit alphanumeric code
  const generateUniqueCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  // Update photo code when shoot category changes
  useEffect(() => {
    if (formData.shootCategory) {
      const prefix = formData.shootCategory === 'individual' ? 'WS-I-' : 'WS-G-';
      setPhotoCode(prefix + generateUniqueCode());
    }
  }, [formData.shootCategory]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAdditionalContactChange = (index, value) => {
    const updatedContacts = [...formData.additionalContacts];
    updatedContacts[index] = value;
    setFormData({
      ...formData,
      additionalContacts: updatedContacts,
    });
  };

  const addContactField = () => {
    setFormData({
      ...formData,
      additionalContacts: [...formData.additionalContacts, ''],
    });
  };

  const removeContactField = (index) => {
    const updatedContacts = formData.additionalContacts.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      additionalContacts: updatedContacts,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.shootCategory) {
      newErrors.shootCategory = 'Please select a shoot category';
    }
    
    // Validate additional contacts if they're not empty
    formData.additionalContacts.forEach((contact, index) => {
      if (contact && !/\S+@\S+\.\S+/.test(contact)) {
        newErrors[`additionalContact${index}`] = 'Email is invalid';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      console.log("Form validated, preparing to submit");
      
      // Format additional contacts
      const formattedContacts = formData.additionalContacts
        .filter(contact => contact.trim() !== '')
        .join(', ');
      
      // Create form data
      const formToSubmit = new FormData();
      formToSubmit.append('Full Name', formData.fullName);
      formToSubmit.append('Email', formData.email);
      formToSubmit.append('Shoot Category', formData.shootCategory === 'individual' ? 'Individual Portrait' : 'Group Portrait');
      formToSubmit.append('Photo Code', photoCode);
      formToSubmit.append('Additional Emails', formattedContacts);
      formToSubmit.append('Phone Number', formData.phoneNumber);
      formToSubmit.append('Notes', formData.notes);
      
      console.log("Form data prepared:", {
        name: formData.fullName,
        email: formData.email,
        category: formData.shootCategory,
        code: photoCode
      });
      
      // Log the URL you're submitting to
      console.log("Submitting to URL:", 'YOUR_GOOGLE_SCRIPT_URL');
      
      // Submit the form data to Google Sheets
      fetch('YOUR_GOOGLE_SCRIPT_URL', {
        method: 'POST',
        body: formToSubmit
      })
      .then(response => {
        console.log("Raw response:", response);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Success response data:', data);
        setIsSubmitted(true);
        setIsSubmitting(false);
      })
      .catch(error => {
        console.error('Error details:', error);
        alert('There was an error submitting your form. Please try again.');
        setIsSubmitting(false);
      });
    }
  };

  const styles = {
    container: {
      maxWidth: '600px',
      margin: '0 auto',
      padding: '2rem',
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    },
    header: {
      textAlign: 'center',
      marginBottom: '2rem'
    },
    title: {
      fontSize: '2rem',
      fontWeight: 'bold',
      marginBottom: '0.5rem'
    },
    price: {
      display: 'inline-block',
      backgroundColor: '#ebf5ff',
      color: '#3b82f6',
      padding: '0.5rem 1rem',
      borderRadius: '0.375rem',
      fontWeight: '600',
      marginTop: '0.5rem'
    },
    formGroup: {
      marginBottom: '1.5rem'
    },
    label: {
      display: 'block',
      fontWeight: '500',
      marginBottom: '0.5rem'
    },
    required: {
      color: '#ef4444'
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.375rem'
    },
    errorInput: {
      borderColor: '#ef4444'
    },
    errorMessage: {
      color: '#ef4444',
      fontSize: '0.875rem',
      marginTop: '0.25rem'
    },
    radioGroup: {
      marginTop: '0.5rem'
    },
    radioLabel: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '0.5rem'
    },
    radio: {
      marginRight: '0.5rem'
    },
    photoCode: {
      padding: '1rem',
      backgroundColor: '#f9fafb',
      borderRadius: '0.375rem',
      marginBottom: '1.5rem'
    },
    codeDisplay: {
      fontFamily: 'monospace',
      fontSize: '1.125rem',
      fontWeight: '600',
      letterSpacing: '0.05em'
    },
    contactRow: {
      display: 'flex',
      marginBottom: '0.5rem'
    },
    removeBtn: {
      marginLeft: '0.5rem',
      padding: '0.5rem',
      backgroundColor: '#fee2e2',
      color: '#dc2626',
      borderRadius: '0.375rem'
    },
    addBtn: {
      marginTop: '0.5rem',
      color: '#3b82f6',
      fontWeight: '500',
      fontSize: '0.875rem'
    },
    submitBtn: {
      width: '100%',
      backgroundColor: '#2563eb',
      color: 'white',
      padding: '0.75rem',
      borderRadius: '0.375rem',
      fontWeight: '500',
      cursor: 'pointer'
    },
    // Thank you page styles
    thankYouContainer: {
      maxWidth: '600px',
      margin: '0 auto',
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '0.5rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      textAlign: 'center'
    },
    thankYouTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginBottom: '1rem'
    },
    codeBox: {
      backgroundColor: '#f9fafb',
      padding: '1rem',
      borderRadius: '0.5rem',
      marginBottom: '1.5rem'
    },
    codeLabel: {
      fontSize: '0.875rem',
      color: '#6b7280',
      marginBottom: '0.25rem'
    },
    finalCode: {
      fontSize: '1.875rem',
      fontFamily: 'monospace',
      fontWeight: 'bold',
      letterSpacing: '0.1em'
    }
  };

  if (isSubmitted) {
    return (
      <div style={styles.thankYouContainer}>
        <h2 style={styles.thankYouTitle}>Thank You!</h2>
        <p style={{marginBottom: '1.5rem'}}>Your photo request has been submitted.</p>
        <div style={styles.codeBox}>
          <p style={styles.codeLabel}>Here is your photo code:</p>
          <p style={styles.finalCode}>{photoCode}</p>
        </div>
        <p style={{fontSize: '0.875rem', color: '#6b7280'}}>Please show this code to your photographer.</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        {/* Use a simple text character instead of the Camera icon */}
        <div style={{fontSize: '2rem', marginBottom: '0.5rem'}}>📷</div>
        <h1 style={styles.title}>Photo Shoot Registration</h1>
        <div style={styles.price}>
          $30
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Full Name */}
        <div style={styles.formGroup}>
          <label htmlFor="fullName" style={styles.label}>
            Full Name <span style={styles.required}>*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            style={{
              ...styles.input,
              ...(errors.fullName ? styles.errorInput : {})
            }}
            placeholder="Enter your full name"
          />
          {errors.fullName && (
            <p style={styles.errorMessage}>{errors.fullName}</p>
          )}
        </div>

        {/* Email Address */}
        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>
            Email Address <span style={styles.required}>*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            style={{
              ...styles.input,
              ...(errors.email ? styles.errorInput : {})
            }}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p style={styles.errorMessage}>{errors.email}</p>
          )}
        </div>

        {/* Shoot Category */}
        <div style={styles.formGroup}>
          <label style={styles.label}>
            Shoot Category <span style={styles.required}>*</span>
          </label>
          <div style={styles.radioGroup}>
            <label style={styles.radioLabel}>
              <input
                type="radio"
                name="shootCategory"
                value="individual"
                checked={formData.shootCategory === 'individual'}
                onChange={handleInputChange}
                style={styles.radio}
              />
              <span>Individual Portrait</span>
            </label>
            <label style={styles.radioLabel}>
              <input
                type="radio"
                name="shootCategory"
                value="group"
                checked={formData.shootCategory === 'group'}
                onChange={handleInputChange}
                style={styles.radio}
              />
              <span>Group Portrait</span>
            </label>
          </div>
          {errors.shootCategory && (
            <p style={styles.errorMessage}>{errors.shootCategory}</p>
          )}
        </div>

        {/* Photo Code (displayed but not editable) */}
        {photoCode && (
          <div style={styles.photoCode}>
            <label style={styles.label}>
              Photo Code (auto-generated)
            </label>
            <div style={styles.codeDisplay}>{photoCode}</div>
          </div>
        )}

        {/* Additional Contact Information */}
        <div style={styles.formGroup}>
          <label style={styles.label}>
            Additional Email Contacts
          </label>
          {formData.additionalContacts.map((contact, index) => (
            <div key={index} style={styles.contactRow}>
              <input
                type="email"
                value={contact}
                onChange={(e) => handleAdditionalContactChange(index, e.target.value)}
                style={{
                  ...styles.input,
                  ...(errors[`additionalContact${index}`] ? styles.errorInput : {})
                }}
                placeholder="Additional email contact"
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeContactField(index)}
                  style={styles.removeBtn}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          {errors[`additionalContact${formData.additionalContacts.length - 1}`] && (
            <p style={styles.errorMessage}>
              {errors[`additionalContact${formData.additionalContacts.length - 1}`]}
            </p>
          )}
          <button
            type="button"
            onClick={addContactField}
            style={styles.addBtn}
          >
            + Add another email contact
          </button>
        </div>

        {/* Phone Number */}
        <div style={styles.formGroup}>
          <label htmlFor="phoneNumber" style={styles.label}>
            Phone Number (Optional)
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            style={styles.input}
            placeholder="Enter your phone number"
          />
        </div>

        {/* Notes */}
        <div style={styles.formGroup}>
          <label htmlFor="notes" style={styles.label}>
            Notes (Optional)
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            rows="3"
            style={styles.input}
            placeholder="Any special requests for your shoot"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition-colors disabled:bg-blue-400"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Registration'}
        </button>
      </form>
    </div>
  );
};

export default PhotoShootRegistrationForm;