/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator,
    ListView,
    Image,
    TouchableOpacity,
    WebView,
    RefreshControl,
} from 'react-native';



class Demo1_ListView_DetailsView extends Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
        };
    }

    componentDidMount() {



    }

    render(){
        return (
    <Navigator
    initialRoute={{component:Page1, newData:this.state.listc}}
    renderScene={this._renderScence}
    />

    )
    }

    _renderScence(router,navigator){
        /*const tag = router.tag

         console.log(`tag=${tag}`)

         if(tag=='page1'){
         return <Page1 navigator={navigator}/>
         }else{
         return <Page2  navigator={navigator} title/>
         }
         */

        let Com = router.component

        return <Com {...router.params} navigator={navigator} />
    }
}

////////////////////////////////////////// Page1 //////////////////////////////////////////////////////

class Page1 extends Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态

        this.state = {
            dataSource : new ListView.DataSource({
                rowHasChanged : (row1, row2) => row1 !== row2
            }),
            loaded : false,
            isRefreshing : false,
            pageNo:1,
            dataAry:[],
            isLoadingMore : false,
            hasNextPage:false,
            pageTotal:1,
            pageSize:15,

        };

    }

//跳转详情页
    _onClick(rowData){
        this.props.navigator.push({component:Page2,passProps:{rowData}})// {rowData}
    }

//入口
    componentDidMount() {
        this._loadNetData()

    }

//加载数据
    _loadNetData () {
        let urls = 'http://mrobot.pcauto.com.cn/xsp/s/club/v4.7/forumsHomePage.xsp?forumId=14637&userId=43803489&filter=pick'
        let url = urls+`&pageNo=${this.state.pageNo}&pageSize=${this.state.pageSize}`
        console.log('拼接后的链接：')
        console.log(url)
        const that = this
        this.setState({isRefreshing:true})
        fetch(url)
            .then(res=>res.json())
            .then(res=>{
                console.log(`这里是第几页:${that.state.pageNo}`)

                let ary1 = that.state.dataAry;
                if (that.state.pageNo == 1){
                    ary1 = res.topicResult.topicList
                }
                else {
                    ary1 = that.state.dataAry.concat(res.topicResult.topicList)
                }

                let pageTotalx =  Math.ceil(res.topicResult.total / that.state.pageSize)//向上取整，获取总页数
                let hasNextPagex = false
                if (pageTotalx > that.state.pageNo){
                    hasNextPagex = true
                }
                else {
                    hasNextPagex = false
                }


                this.setState({
                    dataAry:ary1,
                    dataSource: that.state.dataSource.cloneWithRows(ary1),
                    loaded:true,
                    isRefreshing: false,
                    hasNextPage:hasNextPagex,
                    pageTotal:pageTotalx,
                    isLoadingMore:false,
                });



                console.log(this.state.dataSource)
                return res
            })
            .catch(function(error) {
                    this.setState({
                        loaded:true,
                        isRefreshing: false,
                        isLoadingMore:false,
                    });
                    console.log('错了')
                    console.log(error);
                }
            )

        console.log(this.state.dataSource)
    }

    //下拉刷新
    _onRefresh() {

        this.setState({
            isRefreshing: true,
            pageNo:1,
        });
        console.log('下拉刷新啦')
        this._loadNetData();

    }

    //加载更多
    _loadMore() {
        console.log('加载更多')
        console.log(this.state.pageNo)
        let  pages = this.state.pageNo
        this.setState({
            isRefreshing: true,
            isLoadingMore: true,
            pageNo:pages+1,
        })
        console.log(this.state.pageNo)
        this._loadNetData()
    }

    _toEnd() {

        if (this.state.isLoadingMore || !this.state.hasNextPage || this.state.isRefreshing) {
            console.log("正在刷新中，不允许加载更多")
            return;
        };
        this._loadMore()
    }

    _renderFooter() {
        if (this.state.pageTotal<=0 || this.state.isRefreshing) {
            return null
        }
        if (this.state.pageTotal>this.state.pageNo){
            return (
                <View style={styles.footer}>
                    <Text style={styles.footerTitle}>正在加载更多……</Text>
                </View>
            )
        }else  {
            return (
                <View style={styles.footer}>
                    <Text style={styles.footerTitle}>已加载全部</Text>
                </View>
            )
        }

    }



//UI相关
    render(){

        if(!this.state.loaded){
            return(<View style={styles.container}><Text>Loading</Text></View>)
        }



        return (


            <View style={styles.sViewStyle}>
                <ListView style={styles.vStyle}
                          dataSource={this.state.dataSource}
                          onEndReached={this._toEnd.bind(this)}
                          onEndReachedThreshold = {this.state.pageSize}
                          enableEmptySections = {true}
                          renderFooter={ this._renderFooter.bind(this) }
                          refreshControl={
                              <RefreshControl
                                  refreshing={this.state.isRefreshing}
                                  onRefresh={this._onRefresh.bind(this)}
                                  tintColor="#ff0000"
                                  title="下拉刷新中。。。。"
                                  titleColor="#00ff00"
                                  colors={['#ff0000', '#00ff00', '#0000ff']}
                                  progressBackgroundColor="#ffff00"
                              />
                          }
                          renderRow={(rowData) =>
                              <TouchableOpacity onPress={() => this._onClick(rowData)}>
                                  <View style={styles.myCellStyle}>
                                      <Image source={{uri:rowData["images"][0]}} style={styles.cImageStyle} />

                                      <Text numberOfLines={2} style={styles.cTextStyle} >{rowData["title"]}</Text>

                                  </View>
                              </TouchableOpacity>
                          }/>

                    <View style={{backgroundColor:'red', position:'absolute',right:10,bottom:10, width:30,height:30}}><Text>Click</Text></View>
            </View>
        )
    }


}



////////////////////////////////////////// Page2 //////////////////////////////////////////////////////


class Page2 extends Component{


    _onBack(){
        this.props.navigator.pop()
    }
    render(){
        console.log('这里')//WebView

        const mData = this.props.rowData;

        console.log(mData)

        return (
            <View style={styles.vStyle}>
                <TouchableOpacity onPress={this._onBack.bind(this)}>
                    <View style={styles.blackStyle}/>
                </TouchableOpacity>
                <WebView source={{uri:mData["uri"]}} style={styles.webViewStyle}>
                    <View style = {{backgroundColor:'red', flex:1, width:80, height:50}}/>
                </WebView>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    blackStyle:{
        height:50,
        backgroundColor:'#ccff66',
    },
    textStyle2:{
        flex:1,
        top:20,
        height:50,
        textAlign:'center'
    },
    sViewStyle: {//背景
        flex: 1,
        paddingLeft:12,
        paddingRight:12
    },
    myCellStyle: {//cell
        height:120,
        alignItems:'center',
        flexDirection: 'row',
        borderBottomWidth:0.5
    },
    cTextStyle: {//text
        flex:1,
        left:10,
        fontSize:16,
        right:10,
    },
    cImageStyle: {//image
        width: 100,
        height: 100,
    },
    vStyle:{
        flex:1,
    },
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#66ffcc'
    },
    webViewStyle:{
        flex:1,
        backgroundColor:'#ffffff',

    },
    footer: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
    },
    footerTitle: {
        marginLeft: 10,
        fontSize: 15,
        color: 'gray'
    }
});

AppRegistry.registerComponent('Demo1_ListView_DetailsView', () => Demo1_ListView_DetailsView);
