import React from 'react';

const Activities = ({ activity }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-700">Activity Log</h2>
      
      {activity && activity.length > 0 ? (
        activity.map((item, index) => (
          <div
            key={item._id || index}
            className="border rounded-lg p-4 shadow-sm space-y-2 bg-gray-50"
          >
            <p className="text-sm text-gray-500">
              Activity Type: <span className="font-medium">{item.type}</span>
            </p>
            <p className="text-gray-700">{item.activity}</p>
            <p className="text-xs text-gray-400">
              <span className="font-medium">Date:</span> {new Date(item.date).toLocaleDateString()}
            </p>
            <p className="text-xs text-gray-400">
              <span className="font-medium">By:</span> {item.by?.name || item.by?._id || "Unknown"}
            </p>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No activities recorded yet.</p>
      )}
    </div>
  );
};

export default Activities;
