// src/app/downloads/[slug]/page.js

import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { software } from '../../../softwareData'; // Adjust path
import PasswordForm from './PasswordProtect';

// Helper function to find software data
function getSoftwareData(slug) {
  return software.find((s) => s.slug === slug);
}

// Generate metadata dynamically
export async function generateMetadata({ params }) {
  const softwareItem = getSoftwareData(params.slug);
  if (!softwareItem) {
    return { title: 'Not Found' };
  }
  return {
    title: `Download ${softwareItem.name}`,
    description: softwareItem.description,
  };
}

export default function SoftwareDetailPage({ params, searchParams }) {
  const { slug } = params;
  const softwareItem = getSoftwareData(slug);

  if (!softwareItem) {
    notFound();
  }

  const hasAccess = cookies().get(`password_for_${slug}`)?.value === 'true';

  // --- START OF CHANGES ---

  if (!hasAccess) {
    // If no access, show the password form INSIDE A CONTAINER
    return (
      <div className="container" style={{ paddingTop: '10rem', textAlign: 'center' }}>
        <PasswordForm passwordKey={softwareItem.passwordKey} slug={slug} />
        {searchParams.error && <p style={{ color: 'red', marginTop: '1rem' }}>{searchParams.error}</p>}
      </div>
    );
  }

  // If access is granted, wrap the details in the main container too
  return (
    <div className="software-details-container container">
      <h1 className="page-title">{softwareItem.name}</h1>
      <p><strong>Version:</strong> {softwareItem.version}</p>
      <p><strong>Released:</strong> {softwareItem.releaseDate}</p>
      <p>{softwareItem.description}</p>
      
      <a href={softwareItem.filePath} download className="download-button">
        Download Now
      </a>
    </div>
  );
  
  // --- END OF CHANGES ---
}
