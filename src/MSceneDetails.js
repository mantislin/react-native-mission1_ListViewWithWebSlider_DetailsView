import React, { Component } from 'react';
import {
   StyleSheet,
   WebView,
} from 'react-native';

import MModuleScene from './MModuleScene';

export default class MSceneDetails extends Component {
   render() {
      console.log(`access url: ${this.props.route["url"]}`);
      return (
         <MModuleScene
            navigator={this.props.navigator}
            route={this.props.route}
            navigatorTitle="← 点我返回"
            renderScene={() => {
               return (
                  <WebView style={styles.webView}
                     source={{ uri: this.props.route["url"] }}
                  />
               );
            }}
         />
      );
   }
}

var styles = StyleSheet.create({
   webView: {
      flex: 1,
   },
});
