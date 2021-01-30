import React, { useContext, Fragment, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ContactContext from "../../context/contact/contactContext";
import ContactItem from "../contacts/ContactItem";
import Spinner from "../../components/Layout/Spinner";
const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const { contacts, filtered, getContacts, loading } = contactContext;

  useEffect(() => {
    getContacts();
    //eslint-disable-next-line
  }, []);

  if (contacts !== null && contacts.length === 0 && !loading) {
    return <h4>Please add a contact</h4>;
  }
  return (
    <Fragment>
      {contacts !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map((contact) => {
                return (
                  <CSSTransition
                    key={contact._id}
                    timeout={500}
                    classNames="item"
                  >
                    <ContactItem contact={contact}></ContactItem>
                  </CSSTransition>
                );
              })
            : contacts.map((contact) => {
                return (
                  <CSSTransition
                    key={contact._id}
                    timeout={500}
                    classNames="item"
                  >
                    <ContactItem contact={contact}></ContactItem>
                  </CSSTransition>
                );
              })}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Contacts;
