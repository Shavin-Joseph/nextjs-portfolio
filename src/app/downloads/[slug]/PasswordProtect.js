// src/app/downloads/[slug]/PasswordProtect.js
'use server'; // This whole file can be a server component containing a server action

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// This is the Client Component part for the form
function PasswordForm({ passwordKey, slug }) {
  // This is the Server Action
  async function verifyPassword(formData) {
    'use server';
    const password = formData.get('password');
    const correctPassword = process.env[passwordKey];

    if (password === correctPassword) {
      cookies().set(`password_for_${slug}`, 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 15,
        path: `/downloads/${slug}`,
      });
      redirect(`/downloads/${slug}`);
    } else {
      redirect(`/downloads/${slug}?error=Invalid%20Password`);
    }
  }

  // --- START OF CHANGES ---
  return (
    // Add the main form container class
    <div className="password-form-container"> 
      <form action={verifyPassword}>
        <h2>Password Required</h2>
        <p>Please enter the password to view the download page.</p>
        
        {/* Add the input class */}
        <input 
          type="password" 
          name="password" 
          required 
          className="password-input" 
          placeholder="Enter password..."
        />
        
        {/* Add the button class */}
        <button type="submit" className="unlock-button">Unlock</button>
      </form>
    </div>
  );
  // --- END OF CHANGES ---
}

export default PasswordForm;