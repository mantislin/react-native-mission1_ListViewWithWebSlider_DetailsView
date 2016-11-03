import React, { Component } from 'react';
import {
   ListView,
   StyleSheet,
   Text,
   View,
} from 'react-native';

import MModuleScene from './MModuleScene';
import MModuleWebSlider from './MModuleWebSlider'
import MViewRow from './MViewRow';

export default class MSceneList extends Component {
   constructor(props) {
      super(props);
      const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2, });
      var articles = [];
      this.state = {
         loadingStatus: 0,
         pageNo: 0,
         pageSize: 20,
         articles: articles,
         ds: ds,
         dataSource: ds.cloneWithRows(articles),
         focusPictures: [],
      };
   }

   _loadData(pageNo) {
      try {
         console.log('pageNo = ' + pageNo);
         if (pageNo <= 0 || pageNo === undefined) return;
         if (this.state.loadingStatus === 1) return;
         this.setState({ loadingStatus: 1 });

         var url = `http://mrobot.pconline.com.cn/v2/cms/channels/999?pageNo=${pageNo}&pageSize=${this.state.pageSize}`;

         fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
               var articles = responseJson["articleList"];
               var ds = this.state.ds;

               var articlesOld = this.state.articles;
               if (pageNo <= 0) {
                  articlesOld = [];
               }
               articles = articlesOld.concat(articles);

               focusPictures = [];
               for (var i = 0; i < 5; i++) {
                  var focusPicture = {
                     image: articles[i]["image"],
                     title: articles[i]["title"],
                     url: articles[i]["url"],
                  };
                  focusPictures = [ ...focusPictures, focusPicture ];
               }

               console.log('focusPictures = ', focusPictures);

               this.setState({
                  loadingStatus: 2,
                  pageNo: pageNo,
                  articles: articles,
                  dataSource: ds.cloneWithRows(articles),
                  focusPictures: focusPictures,
               });
            })

      } catch(error) {
         this.setState({
            loadingStatus : -1,
         });
         console.log('error = ', error);
      }
   }

   componentDidMount() {
      this._loadData(1);
   }

   render() {
      return (
         <MModuleScene
            navigator={this.props.navigator}
            route={this.props.route}
            navigatorTitle="文章列表"
            renderScene={() => {
               return (
                  <View style={styles.container}>
                     <MModuleWebSlider style={styles.webSlider}
                        initialIndex={2}
                        interval={3000}
                        dataSource={this.state.focusPictures}
                        onClick={(index, oneData) => {
                           var route = {
                              title: oneData.title,
                              url: oneData.url,
                              index: 1,
                           };
                           this.props.navigator.push(route);
                        }}
                     />
                     <ListView style={styles.listView}
                        enableEmptySections={true}
                        dataSource={this.state.dataSource}

                        renderRow={(rowData) =>
                           <MViewRow key={rowData.id}
                              rowData={rowData}
                              onPress={(props) => {
                                 var route = {
                                    title: rowData.title,
                                    url: rowData.url,
                                    index: 1,
                                 };
                                 this.props.navigator.push(route);
                              }}
                           />
                        }

                        renderSeparator={(sectionID, rowID, adjacentRowHighlighted) =>
                           <View key={rowID}
                              style={styles.viewSeparator}
                           />
                        }
                     />
                  </View>
               );
            }}
         />
      );
   }
}

var styles = StyleSheet.create({
   container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
   },
      webSlider: {
         height: 154,
      },
      listView: {
         flex: 1,
      },
         viewSeparator: {
            height: 1,
            backgroundColor: '#CCC',
         },
});
