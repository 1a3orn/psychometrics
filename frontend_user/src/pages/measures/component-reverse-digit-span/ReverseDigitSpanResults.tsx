import { History } from "./types";
import { useCallback } from "react";
export const ReverseDigitSpanResults = (props: {
  history: History[];
  handleSubmit: (data: Record<string, number>) => void;
  handleCancel: () => void;
}) => {
  const handleSubmitInner = useCallback(() => {
    const filteredHistory = props.history.filter((item) => item.success);
    const maxLength = filteredHistory.length > 0 ? Math.max(...filteredHistory.map((item) => item.length)) : 0;
    props.handleSubmit({
      span: maxLength,
    });
  }, [props.history, props.handleSubmit]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Results</h2>
        <div className="mb-4">
          {props.history.map((item, index) => (
            <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
              <span>{item.number}</span>
              <span className={item.success ? "text-green-600" : "text-red-600"}>
                {item.success ? "Success" : "Failure"}
              </span>
            </div>
          ))}
        </div>
        <div className="flex justify-end space-x-2">
          <button onClick={props.handleCancel} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            Cancel
          </button>
          <button onClick={handleSubmitInner} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
