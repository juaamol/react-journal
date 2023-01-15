import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Note {
  id: string;
  title: string;
  body: string;
  date: number;
  imageURLs?: string[];
}

interface JournalState {
  isSaving: boolean;
  savedMessage: string;
  notes: Note[];
  active: Note | null;
}

const initialState: JournalState = {
  isSaving: false,
  savedMessage: '',
  notes: [],
  active: null,
};

export const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    addNewEmptyNote: (state, action: PayloadAction<Note>) => {
      state.notes.push(action.payload);
      state.isSaving = false;
    },
    setActiveNote: (state, action: PayloadAction<Note>) => {
      state.active = action.payload;
    },
    setNotes: (state, action: PayloadAction<Note[]>) => {
      state.notes = action.payload;
    },
    setSaving: (state) => {
      state.isSaving = true;
    },
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
