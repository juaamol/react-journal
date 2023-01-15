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
    setIsNotSaving: (state) => {
      state.isSaving = false;
    },
    updateNote: (
      state,
      action: PayloadAction<Partial<Pick<Note, 'title' | 'body'>>>,
    ) => {
      if (state.active) {
        state.active = { ...state.active, ...action.payload };
      }
    },
    updateListWithActive: (state) => {
      state.notes = state.notes.map((note) => {
        if (note.id === state.active?.id) {
          return { ...state.active };
        }

        return { ...note };
      });
    },
    deleteNoteById: () => {},
  },
});

export const {
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  setSaving,
  setIsNotSaving,
  updateListWithActive,
  updateNote,
  deleteNoteById,
} = journalSlice.actions;
