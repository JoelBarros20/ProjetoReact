// hooks/navigationState.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

export const NAVIGATION_KEY = "NAVIGATION_STATE";

export async function loadNavigationState() {
  const stateJSON = await AsyncStorage.getItem(NAVIGATION_KEY);
  return stateJSON ? JSON.parse(stateJSON) : undefined;
}

export async function saveNavigationState(state: unknown) {
  await AsyncStorage.setItem(NAVIGATION_KEY, JSON.stringify(state));
}
