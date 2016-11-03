import React, { Component } from 'react';
import {
   Navigator,
   Text,
} from 'react-native';

import MSceneList from './MSceneList';
import MSceneDetails from './MSceneDetails';

export default class Index extends Component {
   render() {

      const routes = [
         { title: '', index: 0, },
      ];

      return (
         <Navigator
            initialRoute={routes[0]}
            initialRouteStack={routes}
            renderScene={(route, navigator) => {
               if (route.index === 0) {
                  return <MSceneList route={route} navigator={navigator} />;
               } else {
                  return <MSceneDetails route={route} navigator={navigator} />;
               }
            }}
         />
      );
   }
}
