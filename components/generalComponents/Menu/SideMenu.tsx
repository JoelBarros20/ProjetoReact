import { View, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";

import styles from "@/app/styles/ComponentsStyles/SideMenu/SideMenu";

type SideMenuProps = {
    forceMenu?: boolean;
    iconColor?: string; // Prop para a cor do ícon
};

export default function SideMenu({ forceMenu = false, iconColor = "#fff" }: SideMenuProps) {

    const navigation = useNavigation();
    const router = useRouter();
    const canGoBack = (navigation as any)?.canGoBack?.() ?? false;
    const showBack = !forceMenu && canGoBack;

    return (
        <View style={styles.SideMenu}>
            <TouchableOpacity
                onPress={() => {
                    if (showBack) {
                        router.back();
                    } else {
                        navigation.dispatch(DrawerActions.openDrawer());
                    }
                }} >
                <MaterialIcons name={showBack ? "arrow-back" : "menu"} size={30} color={iconColor} />
            </TouchableOpacity>
        </View>
    );
}
