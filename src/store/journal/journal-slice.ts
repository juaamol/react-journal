import { createSlice } from '@reduxjs/toolkit';

interface Note {
  id: string;
  title: string;
  body: string;
  date: number;
  imageURLs: string[];
}

interface JournalState {
  isSaving: boolean;
  savedMessage: string;
  notes: any[];
  active: Note | null;
}

const initialState: JournalState = {
  isSaving: true,
  savedMessage: '',
  notes: [],
  active: null,
};

export const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    addNewEmptyNote: () => {},
    setActiveNote: () => {},
    setNotes: () => {},
    setSaving: () => {},
    updateNote: () => {},
    deleteNoteById: () => {},
  },
});

export const {
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote,
  deleteNoteById,
} = journalSlice.actions;
