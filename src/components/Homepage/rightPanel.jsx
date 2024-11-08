import React from 'react';

const RightPanel = () => {
  const suggestions = [
    { id: 1, name: 'Bruce Banner' },
    { id: 2, name: 'Thor Odinson' },
    { id: 3, name: 'Natasha Romanoff' },
  ];

  return (
    <div className="w-64 bg-gray-100 h-screen p-4">
      <h3 className="font-bold text-lg mb-4">People you may know</h3>
      {suggestions.map((person) => (
        <div key={person.id} className="mb-4 flex items-center space-x-4">
          <img src="avatar-url" alt={person.name} className="w-10 h-10 rounded-full" />
          <span>{person.name}</span>
        </div>
      ))}
    </div>
  );
};

export default RightPanel;
