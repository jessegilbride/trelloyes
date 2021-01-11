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

    function removeDeletedCardFromLists(currentLists, cardToRemove) {
      // map over lists
      const updatedLists = currentLists.map(list => {
        // for each list, filter out the cardId in cardIds
        const updatedCardIds = list.cardIds.filter(currentCardId => {
          // if this is not the card to remove, keep/return it
          if(currentCardId !== cardToRemove) {
            return currentCardId
          }
          return
        });
        // put the updated cards into the list
        list.cardIds = updatedCardIds;

        return list;
      })
      return updatedLists;
    }

    const updatedLists = removeDeletedCardFromLists(this.state.store.lists, cardId);
    console.log(updatedLists);
    
    function omit(allCards, cardToOmit) {
      let {[cardToOmit]: _, ...otherCards} = allCards; // how does this know the card ID is the first member/property of the list?
      return otherCards;
    }
    const updatedCards = omit(this.state.store.allCards, cardId);
    console.log(updatedCards);

    // this.forceUpdate();

    this.setState({
      store: {
        lists: updatedLists,
        allCards: updatedCards
      }
    });

  }

  render() {
    console.log('render() ran');
    console.log(this.state.store.lists);

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