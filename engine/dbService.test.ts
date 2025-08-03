import { saveState, loadState } from './dbService';
import { GameState, initialState } from './persistence';

jest.mock('firebase-admin', () => {
  const firestore = {
    data: {},
    collection: jest.fn().mockReturnThis(),
    doc: jest.fn().mockReturnThis(),
    set: jest.fn(function (obj) {
      firestore.data[this._id] = obj;
      return Promise.resolve();
    }),
    get: jest.fn(function () {
      return Promise.resolve({ exists: !!firestore.data[this._id], data: () => firestore.data[this._id] });
    })
  };
  return {
    __esModule: true,
    default: {
      apps: [],
      initializeApp: jest.fn(),
      credential: { cert: jest.fn() },
      firestore: () => firestore
    }
  };
});

describe('dbService', () => {
  it('saves and loads state', async () => {
    const state: GameState = { ...initialState, resources: { stronix: 1, crysalis: 2, pyronis: 3, voltaris: 4 } };
    await saveState('t', state);
    const loaded = await loadState('t');
    expect(loaded.resources.stronix).toBe(1);
  });
});
