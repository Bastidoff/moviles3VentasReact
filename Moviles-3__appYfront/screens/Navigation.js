import react from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VendedorScreen from "./VendedorScreen";
import VentaScreen from "./VentaScreen";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createNativeStackNavigator();

function VentasStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="Ventas"
                component={VentasTabs}
                options={{headerShown:false}}
            />
        </Stack.Navigator>
    )
}

const Tab = createBottomTabNavigator();

function VentasTabs(){
    return(
        <Tab.Navigator
            screenOptions={{
                headerShown: true,}}
            initialRouteName="Vendedor"
        >
            <Tab.Screen 
                name="Vendedor" 
                component={VendedorScreen}
                options={{
                    tabBarIcon: ({color,size}) => (
                        <MaterialCommunityIcons name="account-tie-outline" size={30} color={color} />
                    ),
                }} />
            <Tab.Screen 
                name="Ventas" 
                component={VentaScreen}
                options={{
                    tabBarIcon: ({color,size}) => (
                        <MaterialCommunityIcons name="cash-multiple" size={30} color={color} />
                    ),
                }}/>
        </Tab.Navigator>
    );
}


export default function Navigation(){
    return(
        <NavigationContainer>
            <VentasStack/>
        </NavigationContainer>
    )
}