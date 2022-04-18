import { useEffect, useState } from 'react';
import {Alert, View, StyleSheet ,Text,Image} from "react-native";
import {useNavigation,useRoute, useIsFocused,} from "@react-navigation/native";
import OutlinedButton from "./../../components/UI/OutlinedButton";
import {Colors}  from "./../../constants/colors";
import {getCurrentPositionAsync, useForegroundPermissions,PermissionStatus} from "expo-location";
import { getMapPreview } from "../../util/location";


 

function LocationPicker(){
    const[pickedLocation,setPickedLocation]=useState();
    const navigation=useNavigation();
    const isFocused= useIsFocused();
    const route=useRoute();

    const [locationPermissionInformation, requestPermission] = useForegroundPermissions();
   
    // useEffect(()=>{
    //   if(isFocused && route.params){
    //      const mapPickedLocation = 
    //      {lat: lat.params.pickedLat, 
    //       lng: lng.params.pickedLng, 
    //     };
    //   setPickedLocation(mapPickedLocation);
    // }
    // },[route, isFocused]);
    useEffect(() => {
      if (isFocused && route.params) {
        const mapPickedLocation = {
          lat: route.params.pickedLat,
          lng: route.params.pickedLng,
        };
        setPickedLocation(mapPickedLocation);
        console.log(mapPickedLocation);
      }
    }, [route, isFocused]);
    
        async function verifyPermissions() {
            if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
              const permissionResponse = await requestPermission();
        
              return permissionResponse.granted;
            }
        
            if (locationPermissionInformation.status === PermissionStatus.DENIED) {
              Alert.alert(
                'Insufficient Permissions!',
                'You need to grant location permissions to use this app.'
              );
              return false;
            }
        
            return true;    
          }
    
      async  function getLocationHandler(){
        const hasPermission = await verifyPermissions();

        if(!hasPermission){
            return;
        }

        const location=  await  getCurrentPositionAsync();
        setPickedLocation({
           lat: location.coords.latitude,
           lng: location.coords.longitude
        });
       
    }

    function pickOnkMapHandeler(){
       navigation.navigate('Map');
       
       
    }

    let locationPireview= <Text>no location picked let</Text>
    if(pickedLocation){
      locationPireview=  (
      <Image style={styles.image}
       source={{
          uri: getMapPreview(pickedLocation.lat,pickedLocation.lng)}} />
      )
    }
    
    return( 
    <View>
        <View style={styles.mapPreview}>
           {locationPireview}
        </View>
        <View style={styles.actions}>
            <OutlinedButton icon="location" onPress={getLocationHandler} >Locate user</OutlinedButton>
            <OutlinedButton icon="map" onPress={pickOnkMapHandeler} >Pick on map</OutlinedButton>
        </View>
    </View>
    )
}
export default LocationPicker;

const styles=StyleSheet.create({
    mapPreview:{
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:Colors.primary500,
        borderRadius: 4,
        overflow:'hidden',

    },
    actions:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
    },
    image: {
        width: '100%',
        height: '100%',
        // borderRadius: 4
      },
})