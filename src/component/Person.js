import React from "react";
function Person({person}) {
  return (
    <div>
      <h2>
        This is {person.name}. and my age is {person.age} with id{' '} 
        {person.id}
      </h2>
    </div>
  );
}

export default Person;
