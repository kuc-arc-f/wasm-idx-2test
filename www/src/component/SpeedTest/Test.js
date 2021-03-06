
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Dexie from 'dexie';
import LibTask from '../../libs/LibTask';
import LibDexie from '../../libs/LibDexie';
import LibCommon from '../../libs/LibCommon';
//import LibPaginate from '../../libs/LibPaginate';
import axios from 'axios';

import * as wasm from "wasm-idx";
//
class Test extends Component {
    constructor(props){
        super(props)
        this.state = {title: '', content: ''}
        this.handleClick = this.handleClick.bind(this);
        this.db = null
    }
    componentDidMount(){
        var config = LibTask.get_const()
        this.db = new Dexie( config.DB_NAME );
        this.db.version(config.DB_VERSION).stores( config.DB_STORE );
// console.log( config.DB_STORE );
        this.get_items();
    }
    async add_item (num) {
        var task = {
            title: "title-" + num,
            content: "content-" + num,
            created_at: new Date(),
        }
        await this.db.tasks.add( task)
//        console.log( task )
    }
    test1(){
        for(var i = 1; i<= 1000 ; i++){
            this.add_item(i)
        }
    }        
    async get_items(){
//console.log( "#get_items" )
        var self = this
        await this.db.tasks.toArray().then(function (items ) {
            var tasks = LibDexie.get_reverse_items(items)
            self.setState({ data: tasks })
//console.log( tasks )
        });
        this.dispDom()
    }
    dispDom(){
        if(this.state.data instanceof Array){
            var t0 = performance.now();
            var s_elm = wasm.wasm_object_array("div_post_wrap", this.state.data );
            var t1 = performance.now();
            console.log("Call to function took= " + (t1 - t0) + " milliseconds.");
        }
    }    
    handleClick(){
        console.log("#-handleClick")
        this.test1();
//        this.add_item(1)
//        console.log( this.state )
    }
    render() {
        $("#div_post_wrap").empty();
        return (
        <div className="container">
            <Link to="/speed_test" className="btn btn-outline-primary mt-2">Back</Link>
            <hr className="mt-2 mb-2" />
                <button className="btn btn-primary" onClick={this.handleClick}>Test
                </button>            
            <hr className="mt-2 mb-2" />
            <h1 className="mt-2">SpeedTest- Test / add data</h1>
            <hr />
            <div id="div_post_wrap">
            </div>
        
        </div>
        )
    }
}
export default Test;

