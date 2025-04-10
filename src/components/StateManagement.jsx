import { useState, useEffect } from "react";

const StateManagement = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [showClear, setShowClear] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("e", e);
    console.log(
      "Name:",
      name,
      "Email:",
      email,
      "Phone:",
      phone,
      "Message:",
      message
    );
    saveData(name, email, phone, message);
  };

  const saveData = (name, email, phone, message) => {
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("phone", phone);
    localStorage.setItem("message", message);

    //Refresh the page
    window.location.reload();
    setShowClear(true);
  };

  const clearData = () => {
    localStorage.clear();
    window.location.reload();
    setShowClear(false);
  };

  useEffect(() => {
    if (localStorage.getItem("name")) {
      setShowClear(true);
    }
  }, []);

  const showMessage = () => {
    return (
      <h1 className="text-center text-2xl text-green-500 font-bold">
        Waiting For Data to show
      </h1>
    );
  };

  return (
    <>
      <div className="w-full md:w-1/2 mx-auto min-h-screen flex items-center justify-center p-4">
        {/* Enquiry Form  */}

        <div className="flex flex-col items-center justify-center p-4 sm:p-6 md:p-10 w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] mx-auto border border-gray-400 rounded-lg bg-blue-50/80 shadow-lg min-h-[400px] md:h-[50vh] hover:shadow-xl transition-shadow">
          <input
            type="text"
            placeholder="Name"
            className="border border-gray-300 rounded-md p-2 mb-4 w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Email"
            className="border border-gray-300 rounded-md p-2 mb-4 w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="number"
            placeholder="Phone"
            className="border border-gray-300 rounded-md p-2 mb-4 w-full"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="text"
            placeholder="Message"
            className="border border-gray-300 rounded-md p-2 mb-4 w-full"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md w-full transition-colors"
            onClick={(e) => handleSubmit(e)}
          >
            Submit
          </button>
        </div>
      </div>
      {/* Display Data  */}
      <div className="flex flex-col items-center justify-end p-4 sm:p-6 md:p-10 w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] mx-auto border border-gray-400 rounded-lg bg-blue-50/80 shadow-lg min-h-[400px] md:h-[50vh] hover:shadow-xl transition-shadow">
        <h1>Name: {localStorage.getItem("name")}</h1>
        <h1>Email: {localStorage.getItem("email")}</h1>
        <h1>Phone: {localStorage.getItem("phone")}</h1>
        <h1>Message: {localStorage.getItem("message")}</h1>
        {showClear ? (
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md w-1/2 mt-10 transition-colors"
            onClick={() => clearData()}
          >
            Clear
          </button>
        ) : (
          showMessage()
        )}
      </div>
    </>
  );
};

export default StateManagement;
