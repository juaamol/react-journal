import { Dispatch } from '@reduxjs/toolkit';
import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { store } from '../store';
import { firebaseDB } from '../../firebase/firebase-config';
import { addNewEmptyNote, setActiveNote, setSaving } from './journal-slice';

export const startNewNote = () => {
  return async (dispatch: Dispatch, getState: typeof store.getState) => {
    dispatch(setSaving());

    const { uid } = getState().auth;
    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime(),
    };
    const newDoc = doc(collection(firebaseDB, `${uid}/journal/notes`));
    await setDoc(newDoc, newNote);

    const activeNote = { ...newNote, id: newDoc.id };
    dispatch(addNewEmptyNote(activeNote));
    dispatch(setActiveNote(activeNote));

    console.log({ newDoc });
  };
};
