import React, { Component } from 'react';
import {
   View,
   StyleSheet,
} from 'react-native';

import MModuleNavigator from './MModuleNavigator';

export default class MModuleScene extends Component {

   renderScene(props) {
      return (
         <View></View>
      );
   }

   render() {
      var navigatorTitle = (this.props.navigatorTitle !== undefined ? this.props.navigatorTitle : '');

      var renderScene = null;
      if (this.props.renderScene !== undefined) {
         renderScene = this.props.renderScene(this.props);
      } else {
         renderScene = this.renderScene(this.props);
      }

      return (
         <View style={styles.container}>
            <MModuleNavigator
               navigator={this.props.navigator}
               navigatorTitle={navigatorTitle}
            />
            {renderScene}
         </View>
      );
   }
}

var styles = StyleSheet.create({
   container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-start',
   },
});
