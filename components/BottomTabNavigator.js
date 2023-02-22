import React, { Component } from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";


import LocationScreen from "../screens/locationscreen";
import SearchScreen from "../screens/Search";
const Tab = createBottomTabNavigator();

export default class BottomTabNavigator extends Component {
  render() {
    return (
      //add the code for add navigationcontainer
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Location" component={LocationScreen}/>
          <Tab.Screen name="Search" component={SearchScreen}/>
        </Tab.Navigator>
      </NavigationContainer>

      
    );
  }
}
