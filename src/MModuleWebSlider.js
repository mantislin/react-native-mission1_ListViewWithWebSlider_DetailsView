import React, { Component } from 'react';
import {
   Image,
   ScrollView,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
} from 'react-native';

export default class MModuleWebSlider extends Component {
   constructor(props) {
      super(props);
      this.state = {
         currentIndex: 0,
         initialIndex: 0,
      }
   }

   _measureContainer() {
      this.refs.container.measure((ox, oy, width, height, px, py) => {
         var frame = undefined;
         frame = {
            ox: ox,
            oy: oy,
            width: width,
            height: height,
            px: px,
            py: py,
         };
         if (frame !== undefined) {
            this.setState({
               frameOfContainer: frame,
            });
         }
      });
   }

   /*
    * position: 与_generateFocusView相同
    */
   _styleOfFocusView(position) {
      var style = null;
      if (this.state.frameOfContainer !== undefined) {

         var height = this.state.frameOfContainer.height;
         var width = this.state.frameOfContainer.width;
         //var borderWidth = 1; // testing
         //var backgroundColor = '#0f0'; // testing

         style = {
            height: height,
            width: width,
            //borderWidth: borderWidth, // testing
            //backgroundColor: backgroundColor, // testing
         };
      }
      //console.log(position + ', style = ' + style); // testing
      return style;
   }

   /*
    * position: 哪一张焦点图
    *    0, 前一张
    *    1, 当前的
    *    2, 后一张
    */
   _generateFocusView(position) {
      //console.log('====_generateFocusView'); // testing
      var data = undefined;

      var count = this.props.dataSource.length;
      var index = 0;
      if (count > 1) {
         index = this.state.currentIndex + (position - 1);
         index = (index < 0 ? index + (count * 2) : index);
         index %= count;
      }
      if (index >= 0 && index < count) {
         data = this.props.dataSource[index];
      }

      var title = '';
      var imageUrl = ''; //https://facebook.github.io/react/img/logo_og.png
      var url = '';
      if (data !== undefined) {
         title = data["title"];
         imageUrl = data["image"];
         url = data["url"];
      }

      return (
         <View style={[styles.focusViewDefault, this._styleOfFocusView(position)]}>
            <TouchableOpacity style={{flex: 1,}}
               index={index}
               data={data}
               onPress={() => {
                  //console.log(`this.props.onClick = ${this.props.onClick}`); // testing
                  if (this.props.onClick === undefined) return;
                  this.props.onClick(index, data);
               }}
            >
               <Image style={styles.focusImage}
                  source={{uri: imageUrl,}}
                  resizeMode='cover'
               />
            </TouchableOpacity>
         </View>
      );
   }

   _adjustContentOffset(offset) {
      //console.log('====_adjustContentOffset'); // testing
      if (this.state.frameOfContainer !== undefined) {
         offset = (offset !== undefined ? offset : { x: this.state.frameOfContainer.width, animated: false, });
         this.refs.scrollView.scrollTo(offset);
         this.state.lastOffsetX = this.state.frameOfContainer.width;
      }
      return null;
   }

   _resetInterval(interval) {
      //console.log('_resetInterval'); // testing
      if (this.timer !== undefined) {
         clearInterval(this.timer);
      }

      interval = (interval === undefined ? this.props.interval : interval);
      regex = /\d+/;
      if (!regex.test(interval)) return;

      this.timer = setInterval(() => {
         if (this.state.frameOfContainer === undefined) return;
         offset = { x: this.state.frameOfContainer.width * 2, animated: true, };
         this.refs.scrollView.scrollTo(offset);
      }, interval);
   }

   componentDidMount() {
      setTimeout(() => { //make sure measure work
         if (this.props.initialIndex != this.state.initialIndex) {
            this.state.initialIndex = this.props.initialIndex;
            this.state.currentIndex = this.state.initialIndex;
         }
         this._measureContainer();
      }, 0);

      this._resetInterval(this.props.interval);
   }

   render() {
      return (
         <View ref="container" style={[styles.container, this.props.style]}>
            <ScrollView ref="scrollView"
               style={styles.scrollView}
               horizontal={true}
               scrollEnabled={true}
               pagingEnabled={true}
               keyboardDismissMode="on-drag"
               showsHorizontalScrollIndicator={false}
               showsVerticalScrollIndicator={false}
               onTouchMove={(event) => {
                  this.state.needsToResetInterval = true;
               }}
               onMomentumScrollEnd={(event) => {
                  //console.log('====onMomentumScrollEnd'); // testing
                  var width = event.nativeEvent.contentSize.width;
                  var x = event.nativeEvent.contentOffset.x;
                  var xLast = this.state.lastOffsetX;

                  var one = width / 3;
                  var loc = (x <= 0 ? 0 : Math.floor(x / one)) - 1;
                  var locLast = (xLast <= 0 ? 0 : Math.floor(xLast / one)) - 1;
                  var delta = loc - locLast;

                  var count = this.props.dataSource.length;
                  var currentIndex = this.state.currentIndex + delta;

                  currentIndex = (currentIndex < 0 ? currentIndex + (count * 2) : currentIndex);
                  currentIndex %= count;
                  this.setState({
                     currentIndex: currentIndex,
                     lastOffsetX: x,
                  });

                  if (this.state.needsToResetInterval) {
                     this._resetInterval(this.props.interval);
                     this.state.needsToResetInterval = false;
                  }
                  //console.log(`count = ${count}`); // testing
                  //console.log(`currentIndex = ${currentIndex}`); // testing
               }}
            >
               {this._generateFocusView(0)}
               {this._generateFocusView(1)}
               {this._generateFocusView(2)}
               {this._adjustContentOffset()}
            </ScrollView>
         </View>
      );
   }
}

var styles = StyleSheet.create({
   container: {
      overflow: 'hidden',
   },
      scrollView: {
         flex: 1,
         //backgroundColor: '#909', // testing
      },
         focusViewDefault: {
            width: 0,
            height: 0,
         },
            focusImage: {
               flex: 1,
            },
});
