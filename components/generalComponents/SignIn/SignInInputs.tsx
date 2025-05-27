import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";


import styles from "@/app/styles/ComponentsStyles/SignIn/SignInInputs";

type SignInInputsProps = {
    handleLogin: () => void;
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    password_confirmation: string;
    setPassword_confirmation: React.Dispatch<React.SetStateAction<string>>;
    secureText: boolean;
    setSecureText: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SignInInputs({ handleLogin }: SignInInputsProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPassword_confirmation] = useState('');
    const [secureText, setSecureText] = useState(true);

    return (
        <View style={styles.content}>

            <Text style={styles.title}>Don't have an account?</Text>
            <Text style={styles.subtitle}>Create one</Text>

            <Text style={styles.label}>Nome</Text>
            <View style={styles.inputContainer}>
                <MaterialIcons name="person" size={20} color="#aaa" style={styles.icon} />
                <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
            </View>

            <Text style={styles.label}>Email</Text>
            <View style={styles.inputContainer}>
                <MaterialIcons name="email" size={20} color="#aaa" style={styles.icon} />
                <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
            </View>

            <Text style={styles.label}>Password</Text>
            <View style={styles.inputContainer}>
                <MaterialIcons name="lock" size={20} color="#aaa" style={styles.icon} />
                <TextInput style={styles.input}
                    placeholder="Password"
                    secureTextEntry={secureText}
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setSecureText(!secureText)}>
                    <MaterialIcons name={secureText ? "visibility-off" : "visibility"} size={20} color="#aaa" />
                </TouchableOpacity>
            </View>

            <Text style={styles.label}>Confirmar Password</Text>
            <View style={styles.inputContainer}>
                <MaterialIcons name="lock" size={20} color="#aaa" style={styles.icon} />
                <TextInput style={styles.input}
                    placeholder="Password confirmation"
                    secureTextEntry={secureText}
                    value={password_confirmation}
                    onChangeText={setPassword_confirmation}
                />
                <TouchableOpacity onPress={() => setSecureText(!secureText)}>
                    <MaterialIcons name={secureText ? "visibility-off" : "visibility"} size={20} color="#aaa" />
                </TouchableOpacity>
            </View>
        </View>
    );
}