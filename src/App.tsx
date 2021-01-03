import React from 'react';
import './App.scss';
import data from './data.json';
import Person from './components/Person';

type PersonType = {
  id: number;
  name: string;
  children: number[];
  gender: string;
  parents: number[];
};

const findSpouse = (person: PersonType) => {
  // find a person with same children but different id
  // note: there's no way to tell from the data that two people are a couple if they have no children!
  return data.find(
    (x) =>
      x.id !== person.id &&
      x.children.length > 0 &&
      x.children.sort().join(',') === person.children.sort().join(',')
  );
};

const findTopLevelParents = (): PersonType[] => {
  for (const person of data) {
    // find a person with no parents
    if (person.parents.length === 0) {
      const spouse = findSpouse(person);
      // check if spouse also have no parents
      if (spouse && spouse.parents.length === 0) {
        return [person, spouse];
      }
      // this person has no spouse
      return [person];
    }
  }
  return [];
};

const Children = ({ parent }: { parent: PersonType }) => {
  const parents = [parent, findSpouse(parent)];
  return (
    <div className="branch">
      <div>
        {parents &&
          parents.map((person) => {
            return (
              person && (
                <Person
                  key={`p-${person.id}`}
                  name={person.name}
                  gender={person.gender}
                />
              )
            );
          })}
      </div>
      {parent.children.length > 0 && (
        <div className="children">
          {parent.children.map((childId) => {
            const child = data.find((x) => x.id === childId);
            return child && <Children key={`c-${childId}`} parent={child} />;
          })}
        </div>
      )}
    </div>
  );
};

const topLevelParents = findTopLevelParents();

const App = () => (
  <div className="App">
    <div className="family-tree">
      {topLevelParents[0] ? (
        <Children parent={topLevelParents[0]} />
      ) : (
        <>No top level parents found</>
      )}
    </div>
  </div>
);

export default App;
