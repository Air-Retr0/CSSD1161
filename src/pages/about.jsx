import Sidebar from "../components/sidebar";
import Breadcrumbs from "../components/sub/breadcrumbs";

const AboutUsContent = () => {
  return (
    <main className="w-full min-h-screen p-6 bg-black/95 text-white">
      <Breadcrumbs path={["Home", "About Us"]} />

      <h1 className="text-7xl font-bold text-center mb-8">About Us</h1>

      <div className="flex justify-center gap-12">

        <div className="bg-black p-4 rounded-lg w-64 text-center mt-40">
          <img
            src="images/jah.jpg"
            alt="Jahiem Allen"
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <h2 className="text-xl font-semibold text-white">Jahiem Allen</h2>
          <p className="text-lg text-gray-400">Full Stack Developer</p>
        </div>

        <div className="bg-black p-4 rounded-lg w-64 text-center mt-40">
          <img
            src="images/farod.jpg"
            alt="Farid Zaki"
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <h2 className="text-xl font-semibold text-white">Farid Zaki</h2>
          <p className="text-lg text-gray-400">UX/UI Designer</p>
        </div>

        <div className="bg-black p-4 rounded-lg w-64 text-center mt-40">
          <img
            src="path_to_image/jaelan.jpg" // Replace here
            alt="Jaelan Cruz"
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <h2 className="text-xl font-semibold text-white">Jaelan Cruz</h2>
          <p className="text-lg text-gray-400">ADD ROLE HERE</p>
        </div>

      </div>

      <div className="text-center mt-24">
        <h3 className="text-4xl font-semibold">Our Mission</h3>
        <p className="text-xl mt-6 mb-6">
          We aim to create intuitive and innovative software solutions through collaboration and constant learning. By leveraging each team member’s strengths,
          we strive to build projects that push the boundaries of web and software development while delivering a seamless user experience.
          Our mission is to embrace new technologies and continually improve,
          ensuring that we not only meet requirements but also innovate in every project we tackle
        </p>
      </div>

    </main>
  );
};

const About = () => {
  return (
    <div className="flex">
      <Sidebar />
      <AboutUsContent />
    </div>
  );
};

export default About;
