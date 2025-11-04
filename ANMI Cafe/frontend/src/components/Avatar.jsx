import React from 'react';

// Shared Avatar component with default green-ring silhouette fallback
// Props:
// - photoURL?: string
// - alt?: string
// - size?: 'xs' | 'sm' | 'md' | 'lg' (defaults to 'md')
// - className?: string (extra classes)
export default function Avatar({ photoURL, alt = 'Avatar', size = 'md', className = '' }) {
  let sizeClass = 'size-12';
  switch (size) {
    case 'xs': sizeClass = 'size-8'; break;    // ~32px
    case 'sm': sizeClass = 'size-10'; break;   // ~40px
    case 'md': sizeClass = 'size-12'; break;   // ~48px
    case 'lg': sizeClass = 'h-32 w-32'; break; // ~128px (Profile header)
    default: sizeClass = 'size-12';
  }
  return (
    <div className={`rounded-full ring-2 ring-primary ring-offset-2 ring-offset-white dark:ring-offset-background-dark bg-white dark:bg-background-dark/60 flex items-center justify-center overflow-hidden shrink-0 ${sizeClass} ${className}`.trim()}>
      {photoURL ? (
        <img src={photoURL} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="text-primary/80" width="64" height="64" aria-hidden="true">
          <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z" />
        </svg>
      )}
    </div>
  );
}
