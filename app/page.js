"use client";
import { useState } from "react";
import TripTable from "./components/TripTable";
import TripForm from "./components/TripForm";
import UpdateStatusForm from "./components/UpdateStatusForm";
import { tripsData } from "./data/tripsData";
import { calculateCounters, generateUUID } from "./utils";
import Modal from "./components/Modal";

export default function Home() {
  const [trips, setTrips] = useState(tripsData);
  const counters = calculateCounters(trips);

  const [selected, setSelected] = useState([]);
  const [isTripFormOpen, setIsTripFormOpen] = useState(false);
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);

  const addTrip = (newTrip) => {
    newTrip.tripId = generateUUID();
    newTrip.distanceRemaining =
      Math.floor(Math.random() * (2000 - 500 + 1)) + 500; // random constant value
    newTrip.currentStatusCode = "BKD";
    newTrip.currentStatus = "Booked";

    setTrips([...trips, newTrip]);
    setIsTripFormOpen(false);
  };

  const updateTrips = (values) => {
    setTrips((prevTrips) =>
      prevTrips.map((trip) =>
        selected.includes(trip.tripId) ? { ...trip, ...values } : trip
      )
    );
    setIsUpdateFormOpen(false);
    setSelected([]);
  };

  const handleUpdateStatus = () => {
    setIsUpdateFormOpen(true);
  };

  const handleAddTrip = () => {
    setIsTripFormOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-4 gap-4 mb-4">
        <div className="bg-white p-4 rounded shadow text-center">
          <div>Total Trips</div>
          <div className="text-2xl font-bold">{counters.total}</div>
        </div>
        <div className="bg-white p-4 rounded shadow text-center flex items-center justify-evenly">
          <div>
            <div>Delivered</div>
            <div className="text-2xl font-bold">{counters.delivered} </div>
          </div>
          <div>
            <div>Ontime</div>
            <div className="text-lg font-bold">
              {" "}
              ({((counters.ontime / counters.delivered) * 100).toFixed(
                2
              )}%){" "}
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <div>Delayed</div>
          <div className="text-2xl font-bold">{counters.delayed}</div>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <div>In Transit</div>
          <div className="text-2xl font-bold">{counters.inTransit}</div>
        </div>
      </div>

      <section className="flex justify-end items-center gap-6">
        <button
          className="border rounded p-2.5 border-gray-500 w-[130px] cursor-pointer"
          onClick={handleUpdateStatus}
        >
          Update Status
        </button>

        <button
          className="bg-blue-400 text-white border rounded p-2.5 w-[130px] cursor-pointer"
          onClick={handleAddTrip}
        >
          Add Trip
        </button>
      </section>

      <TripTable trips={trips} selected={selected} setSelected={setSelected} />

      <Modal isOpen={isTripFormOpen} onClose={() => setIsTripFormOpen(false)}>
        <TripForm addTrip={addTrip} />
      </Modal>

      <Modal
        isOpen={isUpdateFormOpen}
        onClose={() => setIsUpdateFormOpen(false)}
      >
        <UpdateStatusForm updateTrips={updateTrips} />
      </Modal>
    </div>
  );
}
