import React, { useState, useEffect } from 'react';
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

  if (isSubmitted) {
    return (
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
            <Check className="h-6 w-6 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
          <p className="mb-6">Your photo request has been submitted.</p>
          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-500 mb-1">Here is your photo code:</p>
            <p className="text-3xl font-mono font-bold tracking-wider">{photoCode}</p>
          </div>
          <p className="text-sm text-gray-600">Please show this code to your photographer.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <div className="text-center mb-6">
        <Camera className="w-12 h-12 mx-auto text-blue-500 mb-2" />
        <h1 className="text-3xl font-bold text-gray-800">Watlie Studios</h1>
        <h2 className="text-xl font-medium text-gray-600 mt-1">Photo Shoot Registration</h2>
        <div className="mt-3 bg-blue-50 text-blue-700 py-2 px-6 rounded-full inline-block font-semibold shadow-sm">
          $30
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Full Name */}
        <div className="mb-4">
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded-md ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter your full name"
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-500 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" /> {errors.fullName}
            </p>
          )}
        </div>

        {/* Email Address */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" /> {errors.email}
            </p>
          )}
        </div>

        {/* Shoot Category */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Shoot Category <span className="text-red-500">*</span>
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="shootCategory"
                value="individual"
                checked={formData.shootCategory === 'individual'}
                onChange={handleInputChange}
                className="mr-2"
              />
              <span>Individual Portrait</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="shootCategory"
                value="group"
                checked={formData.shootCategory === 'group'}
                onChange={handleInputChange}
                className="mr-2"
              />
              <span>Group Portrait</span>
            </label>
          </div>
          {errors.shootCategory && (
            <p className="mt-1 text-sm text-red-500 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" /> {errors.shootCategory}
            </p>
          )}
        </div>

        {/* Photo Code (displayed but not editable) */}
        {photoCode && (
          <div className="mb-4 p-3 bg-gray-50 rounded-md">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Photo Code (auto-generated)
            </label>
            <div className="font-mono text-lg font-semibold tracking-wider">{photoCode}</div>
          </div>
        )}

        {/* Additional Contact Information */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Additional Email Contacts
          </label>
          {formData.additionalContacts.map((contact, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="email"
                value={contact}
                onChange={(e) => handleAdditionalContactChange(index, e.target.value)}
                className={`flex-grow p-2 border rounded-md ${
                  errors[`additionalContact${index}`] ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Additional email contact"
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeContactField(index)}
                  className="ml-2 p-2 bg-red-100 text-red-600 rounded-md"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          {errors[`additionalContact${formData.additionalContacts.length - 1}`] && (
            <p className="mt-1 text-sm text-red-500 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors[`additionalContact${formData.additionalContacts.length - 1}`]}
            </p>
          )}
          <button
            type="button"
            onClick={addContactField}
            className="mt-2 text-sm text-blue-600 font-medium"
          >
            + Add another email contact
          </button>
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number (Optional)
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter your phone number"
          />
        </div>

        {/* Notes */}
        <div className="mb-6">
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
            Notes (Optional)
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            rows="3"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Any special requests for your shoot"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition-colors shadow-md transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center text-lg"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Registration'}
        </button>
      </form>
    </div>
  );
};

export default PhotoShootRegistrationForm;