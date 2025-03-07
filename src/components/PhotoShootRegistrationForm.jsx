import React, { useState, useEffect } from 'react';

const PhotoShootRegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    shootCategory: '',
    additionalEmails: [''],
    phoneNumber: '',
    notes: ''
  });
  
  const [photoCode, setPhotoCode] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Styles
  const styles = {
    container: {
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    },
    header: {
      textAlign: 'center',
      marginBottom: '20px'
    },
    mainTitle: {
      fontSize: '28px',
      fontWeight: 'bold',
      margin: '0 0 8px 0'
    },
    subTitle: {
      fontSize: '22px',
      fontWeight: 'bold',
      margin: '0 0 8px 0',
      color: '#444'
    },
    price: {
      fontSize: '18px',
      color: '#22c55e', // green color
      marginTop: '5px',
      marginBottom: '20px',
      fontWeight: 'bold'
    },
    formGroup: {
      marginBottom: '20px',
      textAlign: 'left' // Ensure all form groups align left
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontWeight: 'bold',
      textAlign: 'left' // Left-align all labels
    },
    required: {
      color: 'red'
    },
    input: {
      width: '100%',
      padding: '10px',
      fontSize: '16px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      boxSizing: 'border-box'
    },
    select: {
      width: '100%',
      padding: '10px',
      fontSize: '16px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      boxSizing: 'border-box',
      backgroundColor: 'white',
      appearance: 'none',
      backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right .7em top 50%',
      backgroundSize: '.65em auto',
      paddingRight: '1.4em'
    },
    error: {
      color: 'red',
      fontSize: '14px',
      marginTop: '5px',
      textAlign: 'left' // Left-align error messages
    },
    addButton: {
      color: '#3b82f6', // blue color
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      textDecoration: 'none',
      display: 'inline-block',
      fontSize: '14px',
      padding: '5px 0',
      fontWeight: 'bold',
      textAlign: 'left' // Left-align the add button
    },
    removeButton: {
      marginLeft: '8px',
      padding: '0 10px',
      backgroundColor: '#fee2e2',
      color: '#dc2626',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      height: '38px'
    },
    inputContainer: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '10px'
    },
    textarea: {
      width: '100%',
      padding: '10px',
      fontSize: '16px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      boxSizing: 'border-box',
      minHeight: '100px',
      fontFamily: 'Arial, sans-serif'
    },
    submitButton: {
      width: '100%',
      padding: '12px',
      fontSize: '16px',
      color: 'white',
      backgroundColor: '#3b82f6', // blue color
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontWeight: 'bold'
    },
    disabledButton: {
      backgroundColor: '#93c5fd', // lighter blue
      cursor: 'not-allowed'
    },
    successContainer: {
      textAlign: 'center',
      padding: '30px'
    },
    successTitle: {
      fontSize: '28px',
      fontWeight: 'bold',
      marginBottom: '20px',
      color: '#3b82f6'
    },
    codeBox: {
      backgroundColor: '#f9fafb',
      padding: '16px',
      borderRadius: '8px',
      marginBottom: '24px',
      border: '1px solid #ddd'
    },
    codeBig: {
      fontSize: '24px',
      fontWeight: 'bold',
      fontFamily: 'monospace',
      margin: '10px 0'
    },
    resetButton: {
      padding: '10px 20px',
      backgroundColor: '#3b82f6',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontWeight: 'bold'
    }
  };

  // Generate random alphanumeric code
  const generateAlphanumericCode = () => {
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
      setPhotoCode(prefix + generateAlphanumericCode());
    }
  }, [formData.shootCategory]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle additional email changes
  const handleAdditionalEmailChange = (index, value) => {
    const newAdditionalEmails = [...formData.additionalEmails];
    newAdditionalEmails[index] = value;
    setFormData({
      ...formData,
      additionalEmails: newAdditionalEmails
    });
  };

  // Add additional email field
  const addEmailField = () => {
    setFormData({
      ...formData,
      additionalEmails: [...formData.additionalEmails, '']
    });
  };

  // Remove additional email field
  const removeEmailField = (index) => {
    if (formData.additionalEmails.length > 1) {
      const newAdditionalEmails = [...formData.additionalEmails];
      newAdditionalEmails.splice(index, 1);
      setFormData({
        ...formData,
        additionalEmails: newAdditionalEmails
      });
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    // Required fields validation
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.shootCategory) newErrors.shootCategory = 'Please select a shoot category';
    
    // Additional emails validation
    formData.additionalEmails.forEach((email, index) => {
      if (email && !/\S+@\S+\.\S+/.test(email)) {
        newErrors[`additionalEmail${index}`] = 'Email is invalid';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      console.log("Form validated, preparing to submit");
      
      // Format additional contacts
      const formattedContacts = formData.additionalEmails
        .filter(email => email.trim() !== '')
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
      console.log("Submitting to URL:", 'https://script.google.com/macros/s/AKfycbwqXTghtGBFkC2djBeN5DdrNtIopj32CoClejRIzLw7uQlPADdsalgaooR5Yg8E1eoP/exec');
      
      // Submit the form data to Google Sheets
      fetch('https://script.google.com/macros/s/AKfycbwqXTghtGBFkC2djBeN5DdrNtIopj32CoClejRIzLw7uQlPADdsalgaooR5Yg8E1eoP/exec', {
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
        setSubmitted(true);
        setIsSubmitting(false);
      })
      .catch(error => {
        console.error('Error details:', error);
        alert('There was an error submitting your form. Please try again.');
        setIsSubmitting(false);
      });
    }
  };

  if (submitted) {
    return (
      <div style={styles.container}>
        <div style={{...styles.successContainer, maxWidth: '500px', margin: '0 auto'}}>
          {/* Success Header with Icon */}
          <div style={{marginBottom: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div style={{
              backgroundColor: '#dbeafe', 
              borderRadius: '50%', 
              width: '70px', 
              height: '70px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <div style={{color: '#2563eb', fontSize: '32px'}}>✓</div>
            </div>
            <h2 style={{...styles.successTitle, marginBottom: '8px'}}>Thank You!</h2>
            <p style={{color: '#4b5563', marginBottom: '5px'}}>Your registration was successful</p>
          </div>
          
          {/* Photo Code Display - Make this stand out */}
          <div style={{
            backgroundColor: '#2563eb', 
            padding: '25px 15px',
            borderRadius: '12px',
            marginBottom: '25px',
            color: 'white',
            textAlign: 'center',
            boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.3)'
          }}>
            <p style={{marginBottom: '10px', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', opacity: '0.9'}}>
              Your Photo Code
            </p>
            <p style={{
              fontSize: '38px', 
              fontWeight: 'bold', 
              letterSpacing: '3px', 
              margin: '15px 0',
              fontFamily: 'monospace'
            }}>{photoCode}</p>
            <p style={{fontSize: '14px', fontStyle: 'italic'}}>Please show this code to your photographer</p>
          </div>
          
          {/* Summary Section - Modern Card */}
          <div style={{
            textAlign: 'left', 
            marginBottom: '30px', 
            padding: '25px', 
            borderRadius: '12px', 
            backgroundColor: 'white',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
          }}>
            <h3 style={{
              fontSize: '16px', 
              marginBottom: '20px', 
              color: '#4b5563', 
              textTransform: 'uppercase',
              letterSpacing: '1px',
              fontWeight: '600'
            }}>Registration Details</h3>
            
            <div style={{display: 'grid', gridTemplateColumns: '1fr', gap: '12px'}}>
              <div>
                <label style={{fontSize: '13px', color: '#6b7280', display: 'block', marginBottom: '4px'}}>Name</label>
                <p style={{fontSize: '16px', fontWeight: '500'}}>{formData.fullName}</p>
              </div>
              
              <div>
                <label style={{fontSize: '13px', color: '#6b7280', display: 'block', marginBottom: '4px'}}>Email</label>
                <p style={{fontSize: '16px'}}>{formData.email}</p>
              </div>
              
              <div>
                <label style={{fontSize: '13px', color: '#6b7280', display: 'block', marginBottom: '4px'}}>Shoot Type</label>
                <p style={{fontSize: '16px'}}>
                  {formData.shootCategory === 'individual' ? 'Individual Portrait' : 'Group Portrait'}
                </p>
              </div>
              
              {formData.phoneNumber && (
                <div>
                  <label style={{fontSize: '13px', color: '#6b7280', display: 'block', marginBottom: '4px'}}>Phone</label>
                  <p style={{fontSize: '16px'}}>{formData.phoneNumber}</p>
                </div>
              )}
              
              {formData.additionalEmails[0] && formData.additionalEmails[0].trim() !== '' && (
                <div>
                  <label style={{fontSize: '13px', color: '#6b7280', display: 'block', marginBottom: '4px'}}>Additional Contacts</label>
                  <p style={{fontSize: '16px'}}>{formData.additionalEmails.filter(email => email.trim() !== '').join(', ')}</p>
                </div>
              )}
              
              {formData.notes && (
                <div>
                  <label style={{fontSize: '13px', color: '#6b7280', display: 'block', marginBottom: '4px'}}>Notes</label>
                  <p style={{fontSize: '16px'}}>{formData.notes}</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Register Another Button */}
          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({
                fullName: '',
                email: '',
                shootCategory: '',
                additionalEmails: [''],
                phoneNumber: '',
                notes: ''
              });
              setPhotoCode('');
            }}
            style={{
              ...styles.resetButton,
              borderRadius: '8px',
              padding: '14px 24px',
              fontWeight: '600',
              boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.2)',
              transition: 'all 0.2s ease',
            }}
          >
            Register Another Session
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.mainTitle}>Watlie Studios</h1>
        <h2 style={styles.subTitle}>Photo Shoot Registration</h2>
        <div style={styles.price}>$30</div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Full Name */}
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="fullName">
            Full Name <span style={styles.required}>*</span>
          </label>
          <input
            style={{
              ...styles.input,
              ...(errors.fullName && {borderColor: 'red'})
            }}
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
          />
          {errors.fullName && <p style={styles.error}>{errors.fullName}</p>}
        </div>

        {/* Email */}
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="email">
            Email Address <span style={styles.required}>*</span>
          </label>
          <input
            style={{
              ...styles.input,
              ...(errors.email && {borderColor: 'red'})
            }}
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          {errors.email && <p style={styles.error}>{errors.email}</p>}
        </div>

        {/* Shoot Category */}
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="shootCategory">
            Shoot Category <span style={styles.required}>*</span>
          </label>
          <select
            style={{
              ...styles.select,
              ...(errors.shootCategory && {borderColor: 'red'})
            }}
            id="shootCategory"
            name="shootCategory"
            value={formData.shootCategory}
            onChange={handleChange}
          >
            <option value="">Select a category</option>
            <option value="individual">Individual Portrait</option>
            <option value="group">Group Portrait</option>
          </select>
          {errors.shootCategory && <p style={styles.error}>{errors.shootCategory}</p>}
        </div>

        {/* Photo Code - Auto-generated and read-only */}
        {photoCode && (
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="photoCode">
              Photo Code
            </label>
            <input
              style={{...styles.input, backgroundColor: '#f9fafb'}}
              id="photoCode"
              type="text"
              value={photoCode}
              readOnly
            />
          </div>
        )}

        {/* Additional Email Contacts */}
        <div style={styles.formGroup}>
          <label style={styles.label}>
            Additional Email Contacts
          </label>
          {formData.additionalEmails.map((email, index) => (
            <div key={index}>
              <div style={styles.inputContainer}>
                <input
                  style={{
                    ...styles.input,
                    ...(errors[`additionalEmail${index}`] && {borderColor: 'red'})
                  }}
                  type="email"
                  value={email}
                  onChange={(e) => handleAdditionalEmailChange(index, e.target.value)}
                  placeholder="Additional email contact"
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeEmailField(index)}
                    style={styles.removeButton}
                  >
                    -
                  </button>
                )}
              </div>
              {errors[`additionalEmail${index}`] && 
                <p style={styles.error}>{errors[`additionalEmail${index}`]}</p>
              }
            </div>
          ))}
          <button
            type="button"
            onClick={addEmailField}
            style={styles.addButton}
          >
            + Add another email
          </button>
        </div>

        {/* Phone Number (Optional) */}
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="phoneNumber">
            Phone Number (Optional)
          </label>
          <input
            style={styles.input}
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Enter your phone number"
          />
        </div>

        {/* Notes (Optional) */}
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="notes">
            Notes (Optional)
          </label>
          <textarea
            style={styles.textarea}
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Any special requests for your photo shoot..."
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            ...styles.submitButton,
            ...(isSubmitting && styles.disabledButton)
          }}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Registration'}
        </button>
      </form>
    </div>
  );
};

export default PhotoShootRegistrationForm;