import React from 'react';
import List from './components/List'
import './App.css';

console.clear();

function App(props) {
  // console.log(props.store);
  // console.log(props.store.lists);
  // console.log(props.store.allCards);

  const lists = props.store.lists;
  const allCards = props.store.allCards;
  // console.log(lists);
  // console.log(allCards);

  return (
    <main className="App">
      <header className="App-header">
        <h1>Trelloyes!</h1>
      </header>
      <div className="App-list">
      {props.store.lists.map(list => (
        <List
          key={list.id}
          header={list.header}
          cards={list.cardIds.map(id => props.store.allCards[id])}
        />
      ))}

      {/* {lists.map(list => (
        <List
          key={list.id}
          header={list.header}
          cards={list.cardIds.map(id => props.store.allCards[id])}
        />
      ))} */}

      </div>
    </main>
  );
}

export default App;
