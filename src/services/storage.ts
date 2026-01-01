// src/services/storage.ts
import * as SecureStore from 'expo-secure-store';

async function isSecureStoreAvailable() {
  try {
    return typeof SecureStore.getItemAsync === 'function';
  } catch {
    return false;
  }
}

export async function setItem(key: string, value: string) {
  if (await isSecureStoreAvailable()) {
    await SecureStore.setItemAsync(key, value);
  } else if (typeof localStorage !== 'undefined') {
    localStorage.setItem(key, value);
  }
}

export async function getItem(key: string) {
  if (await isSecureStoreAvailable()) {
    return await SecureStore.getItemAsync(key);
  } else if (typeof localStorage !== 'undefined') {
    return localStorage.getItem(key);
  }
  return null;
}

export async function deleteItem(key: string) {
  if (await isSecureStoreAvailable()) {
    await SecureStore.deleteItemAsync(key);
  } else if (typeof localStorage !== 'undefined') {
    localStorage.removeItem(key);
  }
}
