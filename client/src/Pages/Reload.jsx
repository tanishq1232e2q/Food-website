import React, { useEffect } from 'react';

const Reload = () => {
  useEffect(() => {
    // Check if the page has already been reloaded in this session
    const reloaded = sessionStorage.getItem('reloaded');

    if (!reloaded) {
      // Set the flag in sessionStorage
      sessionStorage.setItem('reloaded', 'true');

      // Reload the page
      window.location.reload();
    }
  }, []);

  return (
    <div>
      
      {/* Other components and content */}
    </div>
  );
};

export default Reload;