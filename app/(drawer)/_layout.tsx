import { Drawer } from 'expo-router/drawer';

import SessionWrapper from '@/components/sessionWrapper';
import CustomDrawerContent from '@/components/drawer/CustomDrawerContent';

export default function DrawerLayout() {
  return (
    <SessionWrapper>
      <Drawer
        screenOptions={{
          headerShown: false,
          drawerType: 'front',
          drawerInactiveTintColor: "#FFF",
          overlayColor: 'rgba(0,0,0,0.2)',
          drawerStyle: {
            backgroundColor: 'rgba(0,0,0,0.8)',
            width: 325,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          },
        }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name="homepage" options={{ title: 'Home' }} />
        <Drawer.Screen name="categories" options={{ title: 'Categorias' }} />
        <Drawer.Screen name="stack" options={{ title: 'Detalhes' }} />
      

      </Drawer>
    </SessionWrapper>
  );
}
