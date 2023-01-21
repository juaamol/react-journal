import { Dispatch } from '@reduxjs/toolkit';
import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import { store } from '../store';
import { firebaseDB } from '../../firebase/firebase-config';
import {
  addNewEmptyNote,
  deleteActiveNote,
  setActiveNote,
  setActiveNoteImages,
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
  return async (dispatch: Dispatch) => {
    dispatch(setSaving());

    const filesArray = Array.from(files);
    const pendingUploads = filesArray.map((file) => fileUpload(file));
    const images = await Promise.all(pendingUploads);

    dispatch(setActiveNoteImages(images));
    dispatch(setIsNotSaving());
  };
}

export function startDeletingNote() {
  return async (dispatch: Dispatch, getState: typeof store.getState) => {
    dispatch(setSaving());

    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    if (!uid) {
      throw new Error('User does not contain a uid');
    }

    if (!note) {
      throw new Error('Select a note to delete');
    }

    const docRef = doc(firebaseDB, `${uid}/journal/notes/${note.id}`);
    await deleteDoc(docRef);

    dispatch(deleteActiveNote());
    dispatch(setIsNotSaving());
  };
}
