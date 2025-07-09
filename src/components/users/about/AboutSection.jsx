const AboutSection = () => {
  return (
    <section className="py-20 px-6 md:px-16 bg-black text-white">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Image Gallery */}
        <div className="grid grid-cols-2 gap-4">
          <img
            src="/assets/upabout1.webp"
            alt="Authentic Indian Food"
            className="rounded-xl object-cover w-full h-48 md:h-56 shadow-lg hover:scale-105 transition"
          />
          <img
            src="/assets/upabout2.jpg"
            alt="Home Cooked Thali"
            className="rounded-xl object-cover w-full h-48 md:h-56 shadow-lg hover:scale-105 transition"
          />
          <img
            src="/assets/upabout3.jpg"
            alt="Homemade Spices"
            className="rounded-xl object-cover w-full h-48 md:h-56 col-span-2 shadow-lg hover:scale-105 transition"
          />
        </div>

        {/* Text Content */}
        <div>
          <h2 className="text-4xl text-center md:text-5xl font-heading text-yellow-400 mb-6 leading-tight">
            Made with Passion
          </h2>
          <p className="text-gray-300 text-base md:text-lg leading-relaxed font-playfair">
            At{" "}
            <span className="text-yellow-400 font-semibold">Matbakh Bayti</span>
            , every meal is a celebration of home-cooked warmth. Our dishes
            blend traditional recipes and local ingredients to create food
            that's not only nourishing — but filled with care, culture, and
            authenticity.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
