export async function sendEmails(formData) {
  try {
    // If running locally in Vite (not Vercel), mock the response to allow UI testing
    if (import.meta.env.DEV) {
      console.log('Local dev mode: Simulating email send...', formData);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return { success: true, message: 'Date confirmed and emails sent successfully.' };
    }

    const response = await fetch('/api/send-date', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('API route not found. Please ensure backend is configured properly.');
    }

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || 'Email sending failed. Please try again.');
    }

    return data;
  } catch (error) {
    console.error('Email sending failed:', error);
    throw new Error(error.message || 'Something went wrong. Please try again.');
  }
}
