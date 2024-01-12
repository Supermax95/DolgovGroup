const LoadingAnimation = () => {
  return (
    // <img
    //   src="https://usagif.com/wp-content/uploads/loading-96.gif"
    //   alt="Loading..."
    //   // className="w-full h-full object-cover"
    //   className="w-10 h-10 object-cover"
    // />
<div className="relative h-16 w-16">
  <div className="absolute top-0 left-0 w-full h-full bg-transparent border-4 border-gray-300 rounded-full animate-spin"></div>
  <div className="absolute top-0 left-0 w-full h-full bg-transparent border-t-4 border-green-500 rounded-full animate-spin"></div>
</div>

  );
};

export default LoadingAnimation;
