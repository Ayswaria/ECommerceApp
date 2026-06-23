const memoryStore = new Map();

function getStorage() {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage;
    }
  } catch (_error) {
    // ignore and fallback to in-memory store
  }

  return null;
}

const AsyncStorage = {
  async getItem(key) {
    const storage = getStorage();
    if (storage) {
      const value = storage.getItem(key);
      return value === null ? null : value;
    }

    return memoryStore.has(key) ? memoryStore.get(key) : null;
  },

  async setItem(key, value) {
    const storage = getStorage();
    if (storage) {
      storage.setItem(key, String(value));
      return;
    }

    memoryStore.set(key, String(value));
  },

  async removeItem(key) {
    const storage = getStorage();
    if (storage) {
      storage.removeItem(key);
      return;
    }

    memoryStore.delete(key);
  },

  async clear() {
    const storage = getStorage();
    if (storage) {
      storage.clear();
      return;
    }

    memoryStore.clear();
  },

  async getAllKeys() {
    const storage = getStorage();
    if (storage) {
      return Object.keys(storage);
    }

    return Array.from(memoryStore.keys());
  },

  async multiGet(keys) {
    const results = [];
    for (const key of keys) {
      const value = await AsyncStorage.getItem(key);
      results.push([key, value]);
    }
    return results;
  },

  async multiSet(keyValuePairs) {
    for (const [key, value] of keyValuePairs) {
      await AsyncStorage.setItem(key, value);
    }
  },

  async multiRemove(keys) {
    for (const key of keys) {
      await AsyncStorage.removeItem(key);
    }
  },
};

module.exports = AsyncStorage;
module.exports.default = AsyncStorage;
