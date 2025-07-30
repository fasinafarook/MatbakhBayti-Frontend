import React from "react";

const AsianFoodSection = () => {
  return (
    <section className="w-full">
      {/* Heading Row */}
      <div className="flex h-28 md:h-32 relative">
        <div className="w-1/2 bg-white"></div>
        <div className="w-1/2 bg-white"></div>

        <h2 className="absolute inset-0 flex items-center justify-center text-3xl md:text-5xl font-heading font-bold z-10 tracking-wide">
          <span className="text-black">Asian</span>
          <span className="text-yellow-500 ml-2">Food</span>
        </h2>
      </div>

      {/* Split Paragraphs Tightly Against Partition */}
      {/* Split Paragraphs Section - Modern Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left Paragraph */}
        <div className="bg-white flex justify-end items-center px-6 md:px-12 py-10 ">
          <div className="text-black font-medium text-base leading-relaxed tracking-wide text-center whitespace-pre-line font-serif">
            {
              "           While it is important to have\n     naturally occurring sugars in your diet,\n           many foods contain harmful\n       added sugars that contain no\n           nutritional value."
            }
          </div>
        </div>

        {/* Right Paragraph with Yellow Background */}
        <div className="bg-white flex justify-start items-center px-6 md:px-12 py-10">
          <div className="text-black font-medium text-base leading-relaxed tracking-wide text-center whitespace-pre-line font-serif">
            {
              "           While it is important to have\n     naturally occurring sugars in your diet,\n           many foods contain harmful\n       added sugars that contain no\n           nutritional value."
            }
          </div>
        </div>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 px-4 py-8 md:px-12 bg-white">
        {[
          "/assets/asian2.jpg",
          "/assets/asian1.avif", 
          "/assets/asian3.avif",
        ].map((url, idx) => (
          <div
            key={idx}
            className={`
        overflow-hidden rounded-xl shadow-lg hover:scale-[1.02] hover:shadow-xl transition-transform duration-300
        ${idx === 1 ? "h-52" : "h-72"}  // Center image shorter, others taller
      `}
          >
            <img
              src={url}
              alt={`Food ${idx + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default AsianFoodSection;
