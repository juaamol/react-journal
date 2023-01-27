import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import { startNewNote } from '../../../store/journal/thunks';
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
import { RootState, store } from '../../../store';

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
    const collectionRef = { type: 'collection' };
    const documentRef = { id: '1234', type: 'document' };
    const state = { auth: { uid: 1 } } as unknown as RootState;
    const resourceUrl = `${state.auth.uid}/journal/notes`;
    const getState = jest.fn(() => state);
    (collection as jest.Mock).mockReturnValue(collectionRef);
    (doc as jest.Mock).mockReturnValue(documentRef);
    const dispatch = jest.fn();
    await startNewNote()(dispatch, getState);

    const emptyNote = { title: '', body: '', date: new Date().getTime() };
    const addedNote = {
      ...emptyNote,
      id: documentRef.id,
    };

    expect(dispatch).toHaveBeenCalledTimes(4);
    expect(dispatch).toHaveBeenCalledWith(setSaving());
    expect(dispatch).toHaveBeenCalledWith(addNewEmptyNote(addedNote));
    expect(dispatch).toHaveBeenCalledWith(setActiveNote(addedNote));
    expect(dispatch).toHaveBeenCalledWith(setIsNotSaving());
    expect((collection as jest.Mock).mock.calls[0][1]).toBe(resourceUrl);
    expect(doc as jest.Mock).toHaveBeenCalledWith(collectionRef);
    expect((setDoc as jest.Mock).mock.calls[0][0]).toEqual(documentRef);
    expect((setDoc as jest.Mock).mock.calls[0][1]).toEqual(emptyNote);
  });

  afterAll(() => {
    jest.useRealTimers();
  });
});
