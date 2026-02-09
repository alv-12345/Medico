import React from "react";
import { assets } from "../assets/assets"; // adjust paths to your images

const AboutPage = () => {
  return (
    <div className="px-6 md:px-16 py-12 bg-white text-gray-800">
      {/* About Us Section */}
      <section className="flex flex-col md:flex-row items-center gap-10 mb-16">
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            About Us
          </h1>
          <p className="mb-4 leading-relaxed">
            Welcome to <span className="font-semibold">Medico</span>, your trusted partner in managing your healthcare needs conveniently and efficiently. 
            We understand the challenges individuals face when it comes to scheduling doctor appointments and managing treatment schedules.
          </p>
          <p className="mb-4 leading-relaxed">
            Medico is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you’re scheduling your first appointment or managing ongoing care, we’re here to support you every step of the way.
          </p>
          <h2 className="text-2xl font-semibold text-primary mt-6 mb-3">Our Vision</h2>
          <p className="leading-relaxed">
            Our vision is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
          </p>
        </div>
        <div className="flex-1 flex justify-center">
          <img
            src={assets.about_img} // replace with your actual image
            alt="Healthcare Professionals"
            className="rounded-lg shadow-lg w-full md:w-4/5"
          />
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section>
        <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-10">
          Why Choose Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-blue-50 p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">Efficiency</h3>
            <p className="text-gray-700">
              Streamlined appointment scheduling that fits into your busy lifestyle.
            </p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">Convenience</h3>
            <p className="text-gray-700">
              Access to a network of trusted healthcare professionals in your area.
            </p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">Personalization</h3>
            <p className="text-gray-700">
              Tailored recommendations and reminders to help you stay on top of your health.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;