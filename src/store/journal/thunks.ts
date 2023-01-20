import { Dispatch } from '@reduxjs/toolkit';
import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { store } from '../store';
import { firebaseDB } from '../../firebase/firebase-config';
import {
  addNewEmptyNote,
  setActiveNote,
  setIsNotSaving,
  setNotes,
  setSaving,
  updateListWithActive,
} from './journal-slice';
import { loadNotes } from './loadNotes';
import { fileUpload } from './fileUpload';

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
    dispatch(setIsNotSaving());
  };
};

export const startLoadingNotes = () => {
  return async (dispatch: Dispatch, getState: typeof store.getState) => {
    const { uid } = getState().auth;

    if (!uid) {
      throw new Error('User does not contain a uid');
    }

    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

export function startSavingNote() {
  return async (dispatch: Dispatch, getState: typeof store.getState) => {
    dispatch(setSaving());

    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    if (!uid) {
      throw new Error('User does not contain a uid');
    }

    if (!note) {
      throw new Error('No note to update');
    }

    const { id, ...noteToFirestore } = { ...note };
    const docRef = doc(firebaseDB, `${uid}/journal/notes/${id}`);

    await setDoc(docRef, noteToFirestore, { merge: true });

    dispatch(updateListWithActive());
    dispatch(setIsNotSaving());
  };
}

export function startUploadingFiles(files: FileList) {
  return async (dispatch: Dispatch, getState: typeof store.getState) => {
    dispatch(setSaving());

    const url = await fileUpload(files[0]);
    dispatch(setIsNotSaving());
  };
}
