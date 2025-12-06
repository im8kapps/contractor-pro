import AsyncStorage from '@react-native-async-storage/async-storage';

export type StorageKey =
  | 'clients'
  | 'estimates'
  | 'photos'
  | 'jobs'
  | 'employees'
  | 'timeEntries'
  | 'payPeriods';

export async function loadItem<T>(key: StorageKey, fallback: T): Promise<T> {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export async function saveItem<T>(key: StorageKey, value: T): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}