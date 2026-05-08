/**
 * Firebase is OPTIONAL.
 * When not configured (placeholder keys), the app runs fully on localStorage.
 * To enable Firebase: replace the config values below with real ones from Firebase Console.
 */

export const isConfigured = false; // Set to true and fill config to enable Firebase

// Safe no-op stubs — callers import these but they do nothing without Firebase
export const push = (..._args: any[]) => Promise.resolve(null);
export const update = (..._args: any[]) => Promise.resolve(null);
export const onValue = (..._args: any[]) => () => {};
export const off = (..._args: any[]) => {};

export const database: any = null;
export const bookingsRef: any = null;
export const roomsRef: any = null;
export const snacksDrinksRef: any = null;
