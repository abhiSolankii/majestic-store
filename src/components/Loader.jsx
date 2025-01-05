const Loader = ({ message }) => {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500"></div>
      <p className="ml-4 text-purple-500 text-lg font-semibold">{message}</p>
    </div>
  );
};
export default Loader;
