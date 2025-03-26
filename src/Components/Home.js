import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const ViewPageNavigation = () => {
    navigate('/ViewPage');
  };

  const SignUpPageNavigation = () => {
    navigate('/SignUpPage');
  }

  return (
    <div className="min-h-screen ">
      <div className="flex flex-col justify-center items-center pt-20 pb-10 pr-10 md:pr-20 lg:pr-60 pl-10 md:pl-20 lg:pl-60">
        <h1 className="text-4xl font-bold text-center mb-6 text-blue-600">Welcome to Stream Buddy!</h1>
        <p className="text-lg text-center mb-6 max-w-2xl text-gray-700">
          Stream Buddy is a platform that helps you keep track of what you're currently watching, discover new content, and engage with friends by sharing your watchlist.
          Stay up-to-date with the latest shows and movies your friends are watching, and start discussing with them today!
        </p>
        <div className="flex justify-center mb-12">
          <button
            onClick={ViewPageNavigation}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg text-lg hover:bg-blue-600 transition"
          >
            See What Your Friends Are Watching
          </button>
        </div>

        {/* Key Features */}
        <div className="max-w-4xl text-center mb-12">
          <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-3">Track What You Watch</h3>
              <p className="text-gray-600">Easily keep track of all the shows and movies you're watching, and never lose track of your watchlist!</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-3">Discover New Content</h3>
              <p className="text-gray-600">Browse through your friends' watchlists to discover new shows and movies you might enjoy.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-3">Engage with Friends</h3>
              <p className="text-gray-600">Share your opinions, recommend content, and chat with your friends about the latest shows and movies.</p>
            </div>
          </div>
        </div>

        {/* CTA for New Users */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold mb-4">Join Stream Buddy Today</h2>
          <p className="text-gray-700 mb-6">Sign up to start sharing and discovering new shows with your friends!</p>
          <button
            onClick={SignUpPageNavigation}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg text-lg hover:bg-blue-600 transition"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;