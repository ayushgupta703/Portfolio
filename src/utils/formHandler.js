// Form submission handler for the contact form
export const submitContactForm = async (formData) => {
  try {
    const response = await fetch('https://formspree.io/f/mldbzbjn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    if (!response.ok) {
      throw new Error('Form submission failed');
    }
    
    return { success: true, message: 'Thank you for your message! I\'ll get back to you soon.' };
  } catch (error) {
    console.error('Error submitting form:', error);
    return { 
      success: false, 
      message: 'Sorry, there was an error sending your message. Please try again or reach out via email.' 
    };
  }
}; 