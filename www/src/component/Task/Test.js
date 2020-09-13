
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
    get_items(){
//console.log( "#get_items" )
        var self = this
        this.db.tasks.toArray().then(function (items ) {
            var tasks = LibDexie.get_reverse_items(items)
            self.setState({ data: tasks })
//console.log( tasks )
        });
    }    
    handleClick(){
        console.log("#-handleClick")
//        console.log( this.state )
    }
    tabRow(){
        if(this.state.data instanceof Array){
            var json = JSON.stringify( this.state.data);
//console.log( json )
            wasm.wasm_task_disp("div_post_wrap", String(json) );
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
                {this.tabRow()}
            </div>
        
        </div>
        )
    }
}
export default Test;

