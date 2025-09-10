import React from 'react';

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-80 text-center">
        <h2 className="text-2xl font-bold mb-6">Login Not Required</h2>
        <p className="mb-4">Authentication is disabled. Please use the sidebar to navigate the application.</p>
      </div>
    </div>
  );
};

export default Login;
