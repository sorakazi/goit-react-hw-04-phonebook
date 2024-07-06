import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { useEffect, useState } from 'react';

export function App() {
  const storedContacts =  localStorage.getItem('contacts');

  const [contacts, setContacts]  = useState(
    (storedContacts ? JSON.parse(storedContacts) : null) || [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ]);

  const [filter, setFilter] = useState('');
  const [findBy, setFindBy] = useState('name');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = newContact => {
    setContacts( [...contacts, newContact]);
    localStorage.setItem('contacts', JSON.stringify(contacts));
  };

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const searchContact = fieldName => searchString => {
    setFilter(searchString);
     setFindBy(fieldName);
  };

  const handleFindBy = e => {
    e.preventDefault();
    setFindBy(findBy === 'name' ? 'number' : 'name');
  };

  const contactList = contacts
      .filter(c => findBy === '' ||  c[findBy].toLowerCase().includes(filter));

    return (
      <div className="container">
        <h1>Phonebook</h1>
        <div className="phonebook-container">
          <div>
          <h2>New Contact</h2>
          <ContactForm addContact={addContact} contacts={contacts} />
          </div>
          <div>
            <h2>Contacts</h2>
            <div style={{display: 'flex', flexDirection: 'row'}}>
            <button type="button" style={{ width: '75px' }} onClick={handleFindBy}>{findBy === 'name' ? 'ABC' : '123'}</button>
            <Filter by={findBy} searchContact={searchContact} />
            </div>
            <ContactList contacts={contactList} deleteContact={deleteContact} />
          </div>
        </div>
      </div>
    );

}
