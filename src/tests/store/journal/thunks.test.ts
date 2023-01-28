import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import {
  startLoadingNotes,
  startNewNote,
  startSavingNote,
} from '../../../store/journal/thunks';
import {
  addNewEmptyNote,
  deleteActiveNote,
  setActiveNote,
  setActiveNoteImages,
  setIsNotSaving,
  setNotes,
  setSaving,
  updateListWithActive,
} from '../../../store/journal';
import { loadNotes } from '../../../store/journal/loadNotes';
import { testRootState } from '../../fixtures/store-fixtures';
import {
  testCollectionRef,
  testDocumentRef,
  testEmptyNote,
} from '../../fixtures/journal-fixtures';

jest.mock('../../../store/journal/loadNotes', () => ({
  loadNotes: jest.fn(),
}));

jest.mock('firebase/firestore/lite', () => ({
  collection: jest.fn(),
  deleteDoc: jest.fn(),
  doc: jest.fn(),
  setDoc: jest.fn(),
}));

describe('Test journal thunks', () => {
  beforeAll(() => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date(2020, 3, 1));
  });

  test('Should add a new note with id', async () => {
    const state = testRootState;
    const resourceUrl = `${state.auth.uid}/journal/notes`;
    const getState = jest.fn(() => state);
    (collection as jest.Mock).mockReturnValue(testCollectionRef);
    (doc as jest.Mock).mockReturnValue(testDocumentRef);
    const dispatch = jest.fn();
    await startNewNote()(dispatch, getState);

    const emptyNote = { title: '', body: '', date: new Date().getTime() };
    const addedNote = {
      ...emptyNote,
      id: testDocumentRef.id,
    };

    expect(dispatch).toHaveBeenCalledTimes(4);
    expect(dispatch).toHaveBeenCalledWith(setSaving());
    expect(dispatch).toHaveBeenCalledWith(addNewEmptyNote(addedNote));
    expect(dispatch).toHaveBeenCalledWith(setActiveNote(addedNote));
    expect(dispatch).toHaveBeenCalledWith(setIsNotSaving());
    expect(doc as jest.Mock).toHaveBeenCalledWith(testCollectionRef);
    expect((collection as jest.Mock).mock.calls[0][1]).toBe(resourceUrl);
    expect((setDoc as jest.Mock).mock.calls[0][0]).toEqual(testDocumentRef);
    expect((setDoc as jest.Mock).mock.calls[0][1]).toEqual(emptyNote);
  });

  test('Should load notes', async () => {
    const state = testRootState;
    const getState = jest.fn(() => state);
    (loadNotes as jest.Mock).mockReturnValue([testEmptyNote]);
    const dispatch = jest.fn();
    await startLoadingNotes()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(setNotes([testEmptyNote]));
    expect(loadNotes as jest.Mock).toHaveBeenCalledWith(state.auth.uid);
  });

  test('Should save note', async () => {
    const state = testRootState;
    const { id, ...noteToFirestore } = state.journal.active!;
    const resourceUrl = `${state.auth.uid}/journal/notes/${id}`;
    const getState = jest.fn(() => state);
    (doc as jest.Mock).mockReturnValue(testDocumentRef);
    const dispatch = jest.fn();
    await startSavingNote()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledTimes(3);
    expect(dispatch).toHaveBeenCalledWith(setSaving());
    expect(dispatch).toHaveBeenCalledWith(updateListWithActive());
    expect(dispatch).toHaveBeenCalledWith(setIsNotSaving());
    expect((doc as jest.Mock).mock.calls[0][1]).toBe(resourceUrl);
    expect((setDoc as jest.Mock).mock.calls[0][0]).toEqual(testDocumentRef);
    expect((setDoc as jest.Mock).mock.calls[0][1]).toEqual(noteToFirestore);
    expect((setDoc as jest.Mock).mock.calls[0][2]).toEqual({ merge: true });
  });

  afterAll(() => {
    jest.useRealTimers();
  });
});
