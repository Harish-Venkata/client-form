import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [clientDetails, setClientDetails] = useState([]);
  const navigate = useNavigate();

  const handleDelete = async (clientId) => {
    try {
      if (!window.confirm("Are you sure you want to delete this client?")) {
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_APP_URL}/api/v1/clients/${clientId}`,
        { method: "DELETE" }
      );

      const data = await response.json();

      if (data.success) {
        setClientDetails((prev) =>
          prev.filter((client) => client._id !== clientId)
        );
      }
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  };

  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_URL}/api/v1/clients`
        );
        const data = await response.json();

        if (data.success) {
          setClientDetails(data.data);
        } else {
          setClientDetails([]);
        }
      } catch (error) {
        console.error("Error fetching client details:", error);
        setClientDetails([]);
      }
    };

    fetchClientDetails();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-gray-200 p-8 md:p-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-gray-900 tracking-tight">
              Clients
            </h1>
          </div>

          <button
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-full text-sm font-medium transition shadow hover:shadow-md"
            onClick={() => navigate("/addForm")}
          >
            <span className="text-lg leading-none">＋</span>
            Add Client
          </button>
        </div>

        {clientDetails.length === 0 ? (
          <div className="border border-dashed border-gray-300 bg-gray-100 rounded-2xl py-10 flex flex-col items-center text-center">
            <p className="text-gray-700 text-sm md:text-base">
              No clients added yet.
            </p>
            <p className="text-gray-500 text-xs md:text-sm mt-1">
              Click “Add Client” to create your first record.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {clientDetails.map((client) => (
              <div
                key={client._id}
                className="border border-gray-200 bg-white rounded-2xl px-4 py-4 md:px-5 md:py-5 shadow-sm hover:shadow-md transition flex items-center gap-4"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {client.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 truncate">
                    {client.email}
                  </p>

                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-gray-500">
                    <span>{client.phoneNumber}</span>
                    <span className="hidden md:inline text-gray-300">•</span>
                    <span className="truncate max-w-[220px] md:max-w-[300px]">
                      {client.address}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    className="rounded-full border border-gray-300 px-3.5 py-1.5 text-xs font-medium text-gray-700 hover:border-blue-400 hover:text-blue-500 transition"
                    onClick={() =>
                      navigate(`/edit/${client._id}`, { state: { client } })
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="rounded-full bg-red-500 text-white px-3.5 py-1.5 text-xs font-medium hover:bg-red-400 transition"
                    onClick={() => handleDelete(client._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
