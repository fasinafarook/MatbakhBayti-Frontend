const AboutSection = () => {
  return (
    <section className="py-20 px-6 md:px-16 bg-black text-white">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Image Gallery */}
        <div className="grid grid-cols-2 gap-4">
          <img
            src="https://tse1.mm.bing.net/th/id/OIP.OHv_QRoJDtQwoqYTrkKEmwHaE6?rs=1&pid=ImgDetMain&o=7&rm=3"
            alt="Authentic Indian Food"
            className="rounded-xl object-cover w-full h-48 md:h-56 shadow-lg hover:scale-105 transition"
          />
          <img
            src="https://static.vecteezy.com/system/resources/previews/030/060/464/non_2x/a-plate-of-spaghetti-with-meat-and-cheese-on-a-wooden-table-ai-generated-free-photo.jpg"
            alt="Home Cooked Thali"
            className="rounded-xl object-cover w-full h-48 md:h-56 shadow-lg hover:scale-105 transition"
          />
          <img
            src="https://media.istockphoto.com/id/1829241109/photo/enjoying-a-brunch-together.jpg?b=1&s=170667a&w=0&k=20&c=6sHVKSnVnrolHMqfK5_Q0Bpn30_XEzcNw-S8KsI6Nm0="
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
            At <span className="text-yellow-400 font-semibold">Matbakh Bayti</span>, every meal is a celebration of home-cooked warmth.
            Our dishes blend traditional recipes and local ingredients to create food that's not only nourishing — but filled with care, culture, and authenticity.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
