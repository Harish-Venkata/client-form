import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

const EditPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const existingClient = location.state?.client;

  const [clientData, setClientData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  useEffect(() => {
    if (existingClient) {
      setClientData({
        name: existingClient.name || "",
        email: existingClient.email || "",
        phoneNumber: existingClient.phoneNumber || "",
        address: existingClient.address || "",
      });
    }
  }, [existingClient]);

  const handleChange = (e) => {
    setClientData({
      ...clientData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_URL}/api/v1/clients/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(clientData),
        }
      );

      const data = await response.json();
      console.log("Update response:", data);

      navigate("/");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg bg-white rounded-3xl border border-gray-200 shadow-[0_10px_40px_rgba(0,0,0,0.06)] p-8 md:p-10">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6 text-center">
          Edit Client Details
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="John"
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-800 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
              value={clientData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="john23@gmail.com"
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-800 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
              value={clientData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="number"
              name="phoneNumber"
              placeholder="9876543210"
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-800 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
              value={clientData.phoneNumber}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              name="address"
              placeholder="Bangalore"
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-800 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
              value={clientData.address}
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-3 rounded-xl text-sm font-medium hover:bg-blue-500 shadow hover:shadow-md active:scale-[0.99] transition-all"
            >
              Update
            </button>
            <button
              type="button"
              className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl text-sm font-medium hover:border-gray-400 hover:bg-gray-50 active:scale-[0.99] transition-all"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPage;
