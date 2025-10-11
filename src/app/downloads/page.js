// src/app/downloads/page.js

import Link from 'next/link';
import { software } from '../../softwareData'; // Adjust path if needed

export const metadata = {
  title: 'Downloads',
  description: 'Download the latest software created by me.',
};

export default function DownloadsPage() {
  return (
    // Add the new class here
    <div className="container downloads-container">
      <h1 className="page-title">Software Downloads</h1>
      <p className="page-subtitle">Select and download the software</p>
      
      <div className="list-container">
        {/* ... rest of your code ... */}
        {software.map((item) => (
          <Link key={item.id} href={`/downloads/${item.slug}`} className="list-item-link">
            <div className="list-item">
              <h2>{item.name}</h2>
              <p>Version: {item.version}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}