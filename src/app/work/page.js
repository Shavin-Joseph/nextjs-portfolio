// NO "use client" here. This is a Server Component.

import WorkClient from './WorkClient'; // Import the new client component

// The metadata export is now in the correct place.
export const metadata = {
  title: 'My Work',
  description: 'A curated selection of professional web development, software, and design projects by Shavin Joseph.',
};

// This is the main page component for the route.
export default function Work() {
  return (
    <WorkClient />
  );
}