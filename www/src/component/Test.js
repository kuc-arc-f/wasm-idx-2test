import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Dexie from 'dexie';
import LibTask from '../../libs/LibTask';
import LibDexie from '../../libs/LibDexie';
import * as wasm from "wasm-idx";

//
class Test extends React.Component {
    constructor(props) {
    super(props);
    //    this.state = {data: ''}
        this.state = {
            data: '', 
            pages_display:0 ,
            items_all: [],
            page_max : 1,
            page_number : 1,
            pagenate_display: 0,
        }
        this.page_one_max = 20
    }  
    componentDidMount(){
        var config = LibTask.get_const()
// console.log(config)
        this.db = new Dexie( config.DB_NAME );
        this.db.version(config.DB_VERSION).stores( config.DB_STORE );
        this.get_items()        
    }
    tabRow(){
        if(this.state.data.items instanceof Array){
            return this.state.data.items.map(function(object, i){
                console.log(object)
                var json = JSON.stringify( object );
                wasm.wasm_post_row("ul_post_wrap", String(json) );
            })
        }
    }    
    render(){
        return(
        <div>
            <h1>test</h1>
            <h2>welcome, test2</h2>
            <div id="ul_post_wrap">post:
                {this.tabRow()}
            </div>
        </div>
        )
    }
}

export default Test;

