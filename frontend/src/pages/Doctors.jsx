import React, { useState } from "react";
import { assets } from "../assets/assets"; // adjust paths to your images

const DoctorsPage = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState("General Physician");

  const specialties = [
    "General Physician",
    "Gynecologist",
    "Dermatologist",
    "Neurologist",
    "Cardiothoracic Surgeon",
  ];

  const doctors = [
    { name: "Dr. Richard James", specialty: "General Physician", photo: assets.doc1 },
    { name: "Dr. Richard James", specialty: "Senior Psychiatrist", photo: assets.doc2 },
    { name: "Dr. Richard James", specialty: "Dermatologist", photo: assets.doc3 },
    { name: "Dr. Richard James", specialty: "Cardiothoracic Surgeon", photo: assets.doc4 },
    { name: "Dr. Richard James", specialty: "Neurologist", photo: assets.doc5 },
  ];

  const filteredDoctors = doctors.filter(
    (doc) => doc.specialty === selectedSpecialty || selectedSpecialty === "General Physician"
  );

  return (
    <div className="flex px-6 md:px-16 py-12 gap-8">
      {/* Sidebar */}
      <aside className="w-1/4 hidden md:block">
        <h2 className="text-xl font-semibold mb-4">Specialties</h2>
        <ul className="flex flex-col gap-3">
          {specialties.map((spec, idx) => (
            <li
              key={idx}
              onClick={() => setSelectedSpecialty(spec)}
              className={`px-4 py-2 rounded-lg cursor-pointer transition ${
                selectedSpecialty === spec
                  ? "bg-primary text-white shadow-md"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {spec}
            </li>
          ))}
        </ul>
      </aside>

      {/* Doctors Grid */}
      <main className="flex-1">
        <h2 className="text-2xl font-bold text-primary mb-6">
          {selectedSpecialty === "General Physician"
            ? "All Doctors"
            : `${selectedSpecialty} Doctors`}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredDoctors.map((doc, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow hover:shadow-lg transition p-6 text-center"
            >
              <img
                src={doc.photo}
                alt={doc.name}
                className="w-24 h-24 rounded-full mx-auto mb-3"
              />
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                <span className="text-sm text-green-600">Available</span>
              </div>
              <h3 className="font-semibold">{doc.name}</h3>
              <p className="text-sm text-gray-600">{doc.specialty}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default DoctorsPage;