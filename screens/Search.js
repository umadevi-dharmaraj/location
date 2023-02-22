import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, ListItem } from "react-native";
import * as FileSystem from 'expo-file-system';
const filePath = FileSystem.documentDirectory + "coordinate.js";

export default class SearchScreen extends Component {
  constructor(props)
  { 
    super(props); 
    this.state = { 
    isLoading: true,
    data: [],
    displaydata:[],
    searchText:""
  }
  }

  componentDidMount = async()=> {
    try {
      const response =  await FileSystem.readAsStringAsync( filePath)
      console.log(response)
      res = JSON.parse(response)
      console.log(res)
      this.setState({
        isLoading: false,
        data: res,
        displaydata:res
      })
      console.log("hi")
      console.log(this.state.displaydata);
    } catch(error){      
      console.log(error)      
  }
  }

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#607D8B",
        }}
      />
    );
  }
  
  // renderItem = ({ item, i }) => {
  //   return (
  //     <View style={{ borderWidth: 1 }}>
  //       <ListItem title={item.Name}
  //           titleStyle={{fontWeight: 700, color: 'dark-grey'}}
  //           subtitle={
  //             <View >
  //               <Text style={{fontStyle: "italic", fontWeight: 500}}>{item.notes}</Text>
  //               <Text>{item.latitude}</Text>
  //               <Text>{item.longitude}</Text>
  //             </View>
  //           }   
  //           bottomDivider>
  //       </ListItem>
  //     </View>
  //   );
  // };


  renderListItem = ({ item }) => (
    <View>
      {console.log(item)}
      <View style={{ width: '100%', height: 100, justifyContent: 'left', alignItems: 'left' }}>
        <Text style={styles.title}>Name: {item.Name} - {item.notes} </Text>
        <Text style={styles.FlatListItemStyle}> Lat: {item.latitude} Long:{item.longitude}</Text>
      </View>
    </View>
  )

// renderNames = ({item}) => (
    
//       <View>
//         <ListItem
//             title={
//               <View >
//                 <Text>{item.Name}</Text>
//               </View>
//             }
//             titleStyle={{fontWeight: 700, color: 'dark-grey'}}
//             subtitle={
//               <View >
//                 <Text style={{fontStyle: "italic", fontWeight: 500}}>{item.notes}</Text>
//                 <Text>{item.latitude}</Text>
//                 <Text>{item.longitude}</Text>
//               </View>
//             }   
//             bottomDivider           
//         />
//         </View>
    
// )

handleSearch = async text => {
  var enteredText = text.toUpperCase();
  text = text.toUpperCase();
  this.setState({
    displaydata:[]
  })
  for (var names in this.state.data){
    console.log(this.state.data[names])
    if(text == this.state.data[names].Name){
      console.log(this.state.data[names])
      var searchResult =[]
      searchResult.push({latitude: this.state.data[names].latitude ,longitude:  this.state.data[names].longitude, Name: this.state.data[names].Name , notes: this.state.data[names].notes})
      this.setState({
        displaydata:searchResult
      })
    }
  }
  if(!text){
    this.setState({
      displaydata:this.state.data
    })
  }
 
}


render() {       
  const {data,displaydata, searchText} = this.state
  if (this.state.displaydata != undefined) {
    console.log("inside if   " + this.state.displaydata)          
    return (
      <View style={styles.container}>
        <View style={styles.upperContainer}>
            <View style={styles.textinputContainer}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={text => this.setState({ searchText: text })}
                    placeholder={"Type here"}
                    placeholderTextColor={"#FFFFFF"}
                />
                <TouchableOpacity style={styles.scanbutton} onPress={() => this.handleSearch(searchText)}>
                  <Text style={styles.scanbuttonText}>Search</Text>
                </TouchableOpacity>
            </View>
        </View>
        {console.log("inside flatlist" + this.state.displaydata)}
              
        <View style={styles.lowerContainer}>
          {console.log(this.state.displaydata)}
            <FlatList
              data={this.state.displaydata}
              ItemSeparatorComponent = {this.FlatListItemSeparator}
              renderItem = {this.renderListItem }
              keyExtractor={(item, index) => index.toString()}                  
            />
        </View>      
       
      </View>
    )        
    }
    else{
      return(
        <View>
          <Text>Loading...</Text>
        </View>
      )}               
      }
    }
    
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5653D4"
  },
  text: {
    color: "#ffff",
    fontSize: 30
  },
  textInput: {
    width: "57%",
    height: 50,
    padding: 10,
    borderColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 3,
    fontSize: 18,
    backgroundColor: "#5653D4",
    
    color: "#FFFFFF"
  },
  upperContainer: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center"
  },
  textinputContainer: {
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: "#9DFD24",
    borderColor: "#FFFFFF"
  },
  scanbutton: {
    width: 100,
    height: 50,
    backgroundColor: "#9DFD24",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  scanbuttonText: {
    fontSize: 24,
    color: "#0A0101",
    
  },
  lowerContainer: {
    flex: 1,
    
  },
  title: {
    fontSize: 20,
    color:"black"
    
  },
  subtitle: {
    fontSize: 16,
    
  },
  lowerLeftContaiiner: {
    alignSelf: "flex-end",
    marginTop: -40
  },
  transactionContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  FlatListItemStyle: {
    padding: 10,
    fontSize: 18,
    height: 44,
    color:"#FFFFFF"
  },
  
});
