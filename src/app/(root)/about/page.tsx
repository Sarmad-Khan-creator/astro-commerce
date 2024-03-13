import Image from "next/image";

const About = () => {
  return (
    <>
      <section className="mt-14">
        <div className="text-gray-500 text-sm ml-24">
          Home / <span className="text-black">About</span>
        </div>
        <div className="ml-24 flex items-center">
          <div className="flex-1">
            <h2 className="text-4xl font-extrabold">Our Story</h2>
            <p className="w-[80%] text-sm mt-5 leading-6">
              Launced in 2015, Exclusive is South Asia’s premier online shopping
              makterplace with an active presense in Bangladesh. Supported by
              wide range of tailored marketing, data and service solutions,
              Exclusive has 10,500 sallers and 300 brands and serves 3 millioons
              customers across the region.
              <br />
              <br />
              Exclusive has more than 1 Million products to offer, growing at a
              very fast. Exclusive offers a diverse assotment in categories
              ranging from consumer.
            </p>
          </div>
          <div className="w-[600px] h-[600px] relative">
            <Image src="/images/about-image.png" alt="About" fill />
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
