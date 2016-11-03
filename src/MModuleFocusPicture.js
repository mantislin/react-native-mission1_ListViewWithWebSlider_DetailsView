import React, { Component } from 'react';
import {
   Animated,
   Image,
   StyleSheet,
   Text,
   View,
} from 'react-native';

export default class MModuleFocusPicture extends Component {
   constructor(props) {
      super(props);
      this.state = {
         //anime: new Animated.ValueXY(),
         anime: new Animated.Value(0),
         currentIndex: 0,
         dataSource: [],
         initIndex: 0,
      };
   }

   _measureContainer() {
      //this.refs.container.measure( this._getStyle.bind(this) );
      this.refs.container.measure((ox, oy, width, height, px, py) => {
         //console.log('ox = ' + ox); // testing
         //console.log('oy = ' + oy); // testing
         //console.log('width = ' + width); // testing
         //console.log('height = ' + height); // testing
         //console.log('px = ' + px); // testing
         //console.log('py = ' + py); // testing
         var frame = {
            ox: ox,
            oy: oy,
            width: width,
            height: width,
            px: px,
            py: py,
         };
         this.setState({
            frameContainer: frame,
         });

      });
   }

   /*
    * position:
    *    0,当前显示的左边一位
    *    1,当前显示位
    *    2,当前显示的右边一位
    */
   _getStyle(position) {
      console.log('position = ' + position);
      console.log('this.state.anime = ' + this.state.anime.curentValue);
      var result = undefined;
      if (position === undefined || this.state.frameContainer === undefined) {
         result = {
            width: 0,
            height: 0,
            top: 0,
            left: 0,
         };
      } else {
         result = {
            height: this.state.frameContainer.height,
            width: this.state.frameContainer.width,
            top: 0,
            left: ((position - 1) * this.state.frameContainer.width),
            //transform: this.state.anime.getTranslateTransform(),
         };
      }
      console.log(result);
      return result;
   }

   componentDidMount() {
      setTimeout(() => {
         this._measureContainer();
      }, 0);
   }

   render() {
      var value = this.state.anime;
      var a1 = 0;
      return (
         <View ref="container" style={[styles.container, this.props.style]}>
            <Animated.View ref="viewAnime" style={[styles.viewAnime, this._getStyle(0)]}>
               <Text>AHAHAHAHA</Text>
            </Animated.View>
            <Animated.View ref="viewAnime" style={[styles.viewAnime, this._getStyle(1)]}>
               <Text>EHEHEHEHE</Text>
            </Animated.View>
            <Animated.View ref="viewAnime" style={[styles.viewAnime, this._getStyle(2)]}>
               <Text>OHOHOHOHO</Text>
            </Animated.View>
         </View>
      );
   }
}

var styles = StyleSheet.create({
   container: {
      //flex: 1,
      //flexDirection: 'row',
      //justifyContent: 'flex-start',
      //alignItems: 'stretch',
      overflow: 'hidden',
   },
      viewAnime: {
         //flex: 1,
         //flexDirection: 'column',
         //justifyContent: 'center',
         //alignItems: 'center',
         position: 'absolute',
         backgroundColor: '#FFA', // testing
      },
});
