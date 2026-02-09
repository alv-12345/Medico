import React from "react";
import { assets } from "../assets/assets"; // adjust paths to your images

const HomePage = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Banner */}
      <section className="relative bg-blue-50 py-12 px-6 md:px-16 flex flex-col md:flex-row items-center justify-between">
        <div className="max-w-lg">
          <h1 className="text-3xl md:text-5xl font-bold text-primary mb-4">
            Book Appointment With Trusted Doctors
          </h1>
          <button className="bg-primary text-white px-6 py-3 rounded-full shadow-md hover:bg-primary-dark transition">
            Book Appointment
          </button>
        </div>
        <div className="flex gap-4 mt-8 md:mt-0">
          <img src={assets.doc1} alt="Doctor" className="w-28 h-28 rounded-full shadow-md" />
          <img src={assets.doc2} alt="Doctor" className="w-28 h-28 rounded-full shadow-md" />
          <img src={assets.doc3} alt="Doctor" className="w-28 h-28 rounded-full shadow-md" />
        </div>
      </section>

      {/* Find by Speciality */}
      <section className="py-12 px-6 md:px-16">
        <h2 className="text-2xl font-semibold text-center mb-8">Find by Speciality</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
          {[
            { icon: assets.general, label: "General Physician" },
            { icon: assets.pediatrician, label: "Pediatrician" },
            { icon: assets.dentist, label: "Dentist" },
            { icon: assets.gynecologist, label: "Gynecologist" },
            { icon: assets.neurologist, label: "Neurologist" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <img src={item.icon} alt={item.label} className="w-16 h-16 mb-3" />
              <p className="font-medium">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Top Doctors */}
      <section className="py-12 px-6 md:px-16 bg-gray-50">
        <h2 className="text-2xl font-semibold text-center mb-8">Top Doctors to Book</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {Array(10)
            .fill({
              name: "Dr. Richard James",
              specialty: "General Physician",
              photo: assets.doc1,
            })
            .map((doc, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 text-center"
              >
                <img
                  src={doc.photo}
                  alt={doc.name}
                  className="w-24 h-24 rounded-full mx-auto mb-3"
                />
                <h3 className="font-semibold">{doc.name}</h3>
                <p className="text-sm text-gray-600">{doc.specialty}</p>
              </div>
            ))}
        </div>
      </section>

      {/* Bottom Banner */}
      <section className="relative bg-blue-100 py-12 px-6 md:px-16 flex flex-col md:flex-row items-center justify-between">
        <div className="max-w-lg">
          <h2 className="text-2xl md:text-4xl font-bold text-primary mb-4">
            Book Appointment With 100+ Trusted Doctors
          </h2>
          <button className="bg-primary text-white px-6 py-3 rounded-full shadow-md hover:bg-primary-dark transition">
            Book Appointment
          </button>
        </div>
        <div className="mt-8 md:mt-0">
          <img src={assets.smiling_doc} alt="Smiling Doctor" className="w-64" />
        </div>
      </section>
    </div>
  );
};

export default HomePage;