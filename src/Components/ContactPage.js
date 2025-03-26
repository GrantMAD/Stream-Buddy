
const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Title */}
      <h1 className="text-4xl text-center font-bold text-gray-800 mb-8">Contact Us</h1>
      
      {/* Contact Form */}
      <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">We'd love to hear from you!</h2>
        <p className="text-gray-500 mb-6">If you have any questions, feedback, or just want to say hello, reach out to us using the form below.</p>

        <form className="space-y-6">
          {/* Name Input */}
          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-700 mb-2">Your Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email Input */}
          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-700 mb-2">Your Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Message Input */}
          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-700 mb-2">Your Message</label>
            <textarea
              placeholder="Write your message here"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="5"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all duration-200"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
