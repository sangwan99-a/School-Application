import React from "react";

// Glassmorphism layout with floating shapes
export default function GlassLayout({ children, title }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-purple-100 relative overflow-hidden">
      {/* Abstract floating shapes */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-80px] left-[-80px] w-[320px] h-[320px] bg-gradient-to-br from-blue-300 via-blue-200 to-purple-200 rounded-full blur-3xl opacity-60 animate-float" />
        <div className="absolute bottom-[-100px] right-[-100px] w-[340px] h-[340px] bg-gradient-to-tr from-purple-200 via-blue-100 to-blue-300 rounded-full blur-3xl opacity-50 animate-float2" />
        <div className="absolute top-1/2 left-1/2 w-[180px] h-[180px] bg-gradient-to-br from-blue-200 to-purple-100 rounded-full blur-2xl opacity-40 animate-float3" />
      </div>
      {/* Card */}
      <div className="relative z-10 w-full max-w-3xl mx-auto bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-6 md:p-10 flex flex-col gap-6">
        {title && <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-700 mb-2">{title}</h2>}
        {children}
      </div>
      {/* Floating shapes animation */}
      <style>{`
        .animate-float {
          animation: float 7s ease-in-out infinite alternate;
        }
        .animate-float2 {
          animation: float2 9s ease-in-out infinite alternate;
        }
        .animate-float3 {
          animation: float3 11s ease-in-out infinite alternate;
        }
        @keyframes float {
          0% { transform: translateY(0) scale(1); }
          100% { transform: translateY(40px) scale(1.08); }
        }
        @keyframes float2 {
          0% { transform: translateY(0) scale(1); }
          100% { transform: translateY(-30px) scale(1.04); }
        }
        @keyframes float3 {
          0% { transform: translateY(0) scale(1); }
          100% { transform: translateY(25px) scale(1.07); }
        }
      `}</style>
    </div>
  );
}
