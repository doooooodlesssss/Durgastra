import { Tabs } from 'expo-router';
import { View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Fontisto from '@expo/vector-icons/Fontisto';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Entypo from '@expo/vector-icons/Entypo';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#7A6EAA',
        headerStyle: {
          backgroundColor: '#FFFFFF',
        },
        headerShadowVisible: true,
        headerTintColor: '#69a7f3',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          height: 90, // Increased height to accommodate the circle
          borderTopLeftRadius: 27,
          borderTopRightRadius: 27,
          position: 'absolute',
          overflow: 'visible', // Ensures the circle isn't clipped
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarLabel:'',
          tabBarIcon: ({ color, focused }) => (
            <Entypo name="home" size={25} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="mood"
        options={{
          title: 'Mood',
          tabBarLabel:'',
          tabBarIcon: ({ color, focused }) => (
            <Fontisto name="smiley" size={25} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chatbot"
        options={{
          title: 'Chatbot',
          tabBarLabel:'',
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                width: 70,
                height: 70,
                borderRadius: 35,
                backgroundColor: '#ffffff', // Circle background color
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                top: -20, // Positions circle to protrude above the navbar
              }}
            >
              <FontAwesome5 name="chalkboard-teacher" size={35} color="#F78A8D" />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="cycle"
        options={{
          title: 'Cycle',
          tabBarLabel:'',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome6 name="droplet" size={25} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'Mindfulness',
          tabBarLabel:'',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome6 name="spa" size={25} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}