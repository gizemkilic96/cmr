import { FlatList, View ,Text,StyleSheet} from "react-native";
import PlaceItem from "./PlaceItem";
import {Colors} from '../../constants/colors';

function PlacesList({places}){
    if(!places ||places.lenght ===0 ){
        return (<View style={styles.fallbackContainer}>
            <Text style={styles.fallbackText}>no placess ad adding start</Text>
        </View>)
    }

return (
        <FlatList data={places}
        keyExtractor={(item)=>item.id}
        renderItem={({item})=> <PlaceItem  place ={item} />  }

/>
)
}
export default PlacesList;
const styles= StyleSheet.create({
    fallbackContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'

    },
    fallbackText:{
        fontSize:16,
        fontWeight:'bold',
        color: Colors.primary800
    }
})