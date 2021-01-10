import React from 'react';
import List from './components/List';
import STORE from './store';
import './App.css';

console.clear();

class App extends React.Component {
  state = {
    store: STORE,
  }

  newRandomCard = () => {
    const id = Math.random().toString(36).substring(2, 4)
      + Math.random().toString(36).substring(2, 4);
    return {
      id,
      title: `Random Card ${id}`,
      content: 'lorem ipsum',
    }
  }
  
  handleAddCard = (listId) => {
    console.log('handleAddCard() ran');
    // console.log({listId});

    const newCard = this.newRandomCard();
    const newLists = this.state.store.lists.map(list => {
      if (list.id === listId) {
	      return {
          ...list,
          cardIds: [...list.cardIds, newCard.id]
        };
      }
      return list;
    })
    
    this.setState({
      store: {
        lists: newLists,
        allCards: {...this.state.store.allCards, [newCard.id]:newCard}
      }
    });
  }

  handleDeleteCard = (cardId) => {
    console.log('handleDeleteCard() ran');
    // console.log({cardId});

    /* function omit(listsObj, cardToOmit) {
      let {[cardToOmit]: _, ...rest} = listsObj; // how does this know the card ID is the first member/property of the list?
      return rest;
    }
    const listsWithoutDeletedCard = omit(this.state.store.lists, cardId); */

    function removeDeletedCardFromLists(currentLists, cardToRemove) {
      // map over lists
      const updatedLists = currentLists.map(list => {
        // for each list, filter out the cardId in cardIds
        const updatedCardIds = list.cardIds.filter(currentCardId => {
          // if this is not the card to remove, keep/return it
          if(currentCardId !== cardToRemove) {
            return currentCardId
          } // do I need to add an else for when cartToRemove is found?
        });
        // put the updated cards into the list
        list.cardIds = updatedCardIds;

        return list;
      })

      return updatedLists;

      /* let indexToRemove = ??? // using findIndexOf and splice? */
    }

    const updatedLists = removeDeletedCardFromLists(this.state.store.lists, cardId);
    console.log(typeof(updatedLists));
    console.log(updatedLists);
    // console.table(this.state.store);
    // console.table(this.state.store.lists);

    // this.forceUpdate();

    /* this.setState({
      store: {
        lists: updatedLists
      }
    }); */

    // console.log(this.state.store.lists === listsWithoutDeletedCard ? 'lists do match' : 'lists do not match');
    // console.table(this.state.store.lists);
    // console.table(listsWithoutDeletedCard);

  }

  render() {
    console.log('render() ran');
    // console.log(this.state.store)
    console.table(this.state.store)
    // console.table(this.state.store.lists)
    // console.table(this.state.store.allCards)

    return (
      <main className="App">
        <header className="App-header">
          <h1>TrelloYAAAS!</h1>
        </header>
        <div className="App-list">
          {this.state.store.lists.map(list => (
            <List
              key={list.id}
              id={list.id}
              header={list.header}
              cards={list.cardIds.map(id => this.state.store.allCards[id])}
              onAddCard={this.handleAddCard}
              onDeleteCard={this.handleDeleteCard}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;