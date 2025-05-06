import { useRouter } from "expo-router";
import { useEffect } from "react";
import { useRootNavigationState } from "expo-router";

export default function Index() {
  const router = useRouter();
  const navigationState = useRootNavigationState();

  useEffect(() => {
    if (navigationState?.key) {
      router.push("/initial_page"); 
    }
  }, [navigationState?.key]);

  return null; 
}
