import React from "react";

export default function PostBody({ poster, content }) {
  return (
    <div className="border-b border-[#3F3F3F] py-4 lg:py-5 lg:text-xl">
      <p className="mb-4">{content ?? "No content available!"}</p>

      <div className="flex items-center justify-center overflow-hidden">
        {poster && (
          <img
            className="max-w-full"
            src={`http://localhost:3000/${poster}`}
            alt="poster"
          />
        )}
      </div>
    </div>
  );
}
