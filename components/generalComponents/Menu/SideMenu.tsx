import { View, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";

import styles from "@/app/styles/ComponentsStyles/SideMenu/SideMenu";

type SideMenuProps = {
    forceMenu?: boolean;
    iconColor?: string;
    from?: string;
    fromSearch?: string; // <-- aceita string (vem dos params)
};

export default function SideMenu({ forceMenu = false, iconColor = "#fff", from, fromSearch }: SideMenuProps) {
    const navigation = useNavigation();
    const router = useRouter();
    const canGoBack = (navigation as any)?.canGoBack?.() ?? false;
    const showBack = !forceMenu && canGoBack;

    return (
        <View style={styles.SideMenu}>
            <TouchableOpacity
                onPress={() => {
                    console.log('SideMenu:', { from, fromSearch, showBack });
                    if (showBack) {
                        if (fromSearch === 'true') {
                            console.log('Ação: router.back() (fromSearch)');
                            router.back();
                        } else if (from && from.startsWith('categories/')) {
                            console.log('Ação: router.replace para categoria', from);
                            router.replace(`/${from}` as any);
                        } else if (from === 'homepage') {
                            console.log('Ação: router.replace para homepage');
                            router.replace('/homepage');
                        } else {
                            console.log('Ação: router.back() (default)');
                            router.back();
                        }
                    } else {
                        console.log('Ação: abrir drawer');
                        navigation.dispatch(DrawerActions.openDrawer());
                    }
                }}
            >
                <MaterialIcons name={showBack ? "arrow-back" : "menu"} size={30} color={iconColor} />
            </TouchableOpacity>
        </View>
    );
}
