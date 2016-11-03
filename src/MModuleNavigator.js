import React, { Component } from 'react';
import {
   StatusBar,
   StyleSheet,
   Text,
   View,
   TouchableOpacity,
} from 'react-native';

export default class MModuleNavigator extends Component {

   _onBack(navigator) {
      if (this.props.onBack !== undefined) {
         this.props.onBack();
      } else if (this.props.navigator !== undefined) {
         this.props.navigator.pop();
      }
   }

   render() {
      var navigatorTitle = this.props.navigatorTitle;
      navigatorTitle = (navigatorTitle === undefined ? '' : navigatorTitle);

      return (
         <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={styles.viewStatusBar} />
            <View style={styles.viewNavigator}>
               <Text style={styles.textCenter}
                  numberOfLines={1}
                  onPress={() => {
                     this._onBack();
                  }}
               >
                  {navigatorTitle}
               </Text>
         </View>
         </View>
         //Adjacent JSX elements must be wrapped in an enclosing tag
      );
   }
}

var styles = StyleSheet.create({
   container: {
      height: 64,
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'stretch',
      alignSelf: 'stretch',
      backgroundColor: 'dodgerblue',
   },
      viewStatusBar: {
         height: 20,
      },
      viewNavigator: {
         flexDirection: 'row',
         height: 44,
         alignItems: 'center',
         justifyContent: 'center',
         paddingHorizontal: 10,
      },
         textCenter: {
            flex: 1,
            fontSize: 20,
            textAlign: 'center',
            textAlignVertical: 'center',
            color: '#fff',
         },
});
