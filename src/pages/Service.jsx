import { useState } from "react";
import Navbar from "../layout/Navbar";
import BottomBar from "../layout/BottomBar";
import Footer from "../layout/Footer";

export default function Service() {

    const [files, setFiles] = useState([]);

    const handleUpload = (e) => {
        setFiles([...e.target.files]);
    };

  return (
    <div>
      <Navbar/>
      <div className="bg-gray-50 p-6 flex justify-center items-center pt-24">
      <div className="max-w-3xl bg-white rounded-3xl shadow-lg p-8 space-y-6">

        <h1 className="text-3xl font-bold text-gray-900 font3">
          Submit a Support Request
        </h1>
        <p className="text-gray-500 font1">
          Facing an issue? Tell us and our team will help you shortly.
        </p>

        {/* Subject */}
        <div>
          <label className="block font-semibold mb-1 font3">Subject</label>
          <input
            type="text"
            placeholder="Short title of your issue"
            className="w-full border rounded-xl px-4 py-3 outline-none focus:border-green-500"
          />
        </div>

        {/* Issue Type */}
        <div>
          <label className="block font-semibold mb-1 font3">Issue Type</label>
          <select className="w-full border rounded-xl px-4 py-3 outline-none focus:border-green-500">
            <option>Bug</option>
            <option>Payment Issue</option>
            <option>Delivery Problem</option>
            <option>App Not Working</option>
            <option>Other Issue</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold mb-1 font3">Description</label>
          <textarea
            rows="5"
            placeholder="Explain your issue in detail..."
            className="w-full border rounded-xl px-4 py-3 outline-none focus:border-green-500 resize-none"
          />
        </div>

        {/* Upload */}
        <div>
          <label className="block font-semibold mb-2 font3">
            Upload Screenshots (optional)
          </label>

          <div className="border-2 border-dashed rounded-2xl p-6 text-center text-gray-500 hover:border-green-500 transition">
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="hidden"
              id="upload"
            />
            <label htmlFor="upload" className="cursor-pointer">
              📷 Click to upload or drag images here
            </label>

            {files.length > 0 && (
              <p className="mt-3 text-sm text-green-600">
                {files.length} file(s) selected
              </p>
            )}
          </div>
        </div>

        {/* Submit */}
        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-2xl font-semibold text-lg transition font1">
          Submit Issue
        </button>

        {/* Trust Message */}
        <p className="text-sm text-gray-400 text-center font3">
          Your request is securely sent to our support team.
        </p>

      </div>
    </div>
    <BottomBar />
    <Footer />
    </div>
  )
}
