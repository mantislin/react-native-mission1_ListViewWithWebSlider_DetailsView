import React, { Component } from 'react';
import {
   StyleSheet,
   Text,
   View,
   TouchableOpacity,
} from 'react-native';

export default class MSceneList extends Component {
   _onRowClicked(props) {
      if (props.onPress !== undefined) {
         props.onPress(props);
      }
   }

   render() {
      return (
         <View style={styles.container}>
            <TouchableOpacity style={styles.touchable}
               onPress={() => {this._onRowClicked(this.props);}} >
               <Text style={styles.textTitle}
                  numberOfLines={1}
               >
                  {this.props.rowData["title"]}
               </Text>
            </TouchableOpacity>
         </View>
      );
   }
}

var styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 12,
      backgroundColor: '#ffe',
   },
      touchable: {
         flex: 1,
      },
         textTitle: {
            flex: 1,
         },
});
