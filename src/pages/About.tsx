
import Navbar from "@/components/Navbar";

const About = () => {
  return (
    <div className="min-h-screen bg-blue-100">
      <Navbar />
      <div className="py-16 px-6 md:px-12 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">About Orielix</h1>
        <p className="text-lg mb-4">
          Orielix is an innovative learning platform designed to help people achieve their educational goals through personalized guidance and hands-on experience.
        </p>
        <p className="text-lg">
          Our mission is to make quality education accessible to everyone, everywhere. We believe in the power of personalized learning paths and interactive content to transform how people acquire new skills.
        </p>
      </div>
    </div>
  );
};

export default About;
