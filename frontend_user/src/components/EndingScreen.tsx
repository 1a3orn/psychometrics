export const EndingScreen = ({
  results,
  handleCancel,
  handleSubmit,
}: {
  results: {
    name: string;
    value: number;
  }[];
  handleCancel: () => void;
  handleSubmit: () => void;
}) => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen text-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        {results.map((result) => (
          <div key={result.name}>
            <h2 className="text-3xl font-bold mb-4">{result.name}</h2>
            <p className="text-5xl font-bold text-blue-600 mb-8">{result.value}</p>
          </div>
        ))}
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleCancel}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
          >
            Forget result
          </button>
          <button
            onClick={() => handleSubmit()}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
