
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Dexie from 'dexie';
import LibTask from '../../libs/LibTask';
import LibDexie from '../../libs/LibDexie';
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
//        LibDexie.func1()
        var config = LibTask.get_const()
        this.db = new Dexie( config.DB_NAME );
        this.db.version(config.DB_VERSION).stores( config.DB_STORE );   
        this.get_items();              
    }
    async get_items(){
//console.log( "#get_items" )
        var self = this
        await this.db.tasks.toArray().then(function (items ) {
            var tasks = LibDexie.get_reverse_items(items)
            self.setState({ data: tasks })
//console.log( tasks )
        });
        this.dispDom();
    }    
    handleClick(){
//        console.log("#-handleClick")
/*
        let d = wasm.send_example_to_js();
        console.log( d )
        let d2 = wasm.receive_example_from_js(d, "f4-from-js")
        console.log( d2 )
*/

    }
    dispDom(){
        if(this.state.data instanceof Array){

            var t0 = performance.now();
            var s_elm = wasm.wasm_object_array("div_post_wrap", this.state.data );
//            console.log( s_elm )
           var t1 = performance.now();            
           /*
            this.state.data.map(function(object, i){
                var s = wasm.wasm_object_row("div_post_wrap", object );
            })
            */
            console.log("Call to function took= " + (t1 - t0) + " milliseconds.");
        }
    }
    tabRow(){
        if(this.state.data instanceof Array){
            var t0 = performance.now();
            return this.state.data.map(function(object, i){
                //var s = wasm.wasm_object_row("div_post_wrap", object );
// console.log( s )
            })
            var t1 = performance.now();
            console.log("Call to function took= " + (t1 - t0) + " milliseconds.");
        }
    }    
    render() {
        $("#div_post_wrap").empty();
        return (
        <div className="container">
            <Link to="/task" className="btn btn-outline-primary mt-2">Back</Link>
            <hr className="mt-2 mb-2" />
            <h1 className="mt-2">Task- Test</h1>
            <hr />
            <div className="form-group">
                <button className="btn btn-primary" onClick={this.handleClick}>test
                </button>
            </div>
            <hr />
            <div id="div_post_wrap">
            </div>
        
        </div>
        )
    }
}
export default Test;

