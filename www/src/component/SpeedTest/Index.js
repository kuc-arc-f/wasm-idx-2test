// result: 2,000 rec : 35 - 40 msec( 0.040 sec)
//
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Dexie from 'dexie';
import LibTask from '../../libs/LibTask';
import LibDexie from '../../libs/LibDexie';
import * as wasm from "wasm-idx";

//
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {data: ''}
        this.db = null
        this.handleClickExport = this.handleClickExport.bind(this);
    }
    componentDidMount(){
        var config = LibTask.get_const()
// console.log(config)
        this.db = new Dexie( config.DB_NAME );
        this.db.version(config.DB_VERSION).stores( config.DB_STORE );
        this.get_items()        
    }
    handleClickExport(){
        console.log("#-handleClickExport")
        var content = JSON.stringify( this.state.data );
// console.log(content)
        var blob = new Blob([ content ], { "type" : "application/json" });
        var fname = "tasks.json"
        if (window.navigator.msSaveBlob) { 
            console.log("#-msSaveBlob")
            window.navigator.msSaveBlob(blob, fname ); 
            window.navigator.msSaveOrOpenBlob(blob, fname ); 
        } else {
            console.log("#-msSaveBlob-false")
            document.getElementById("download").href = window.URL.createObjectURL(blob);
        }        
    }    
    get_items(){
        var self = this
        this.db.tasks.toArray().then(function (items ) {
            var tasks = LibDexie.get_reverse_items(items)
            self.setState({ data: tasks })
// console.log( tasks )
        });
    }
    tabRow(){
        if(this.state.data instanceof Array){
            var json = JSON.stringify( this.state.data);
//console.log( json )
            var t0 = performance.now();
            wasm.wasm_test("div_post_wrap", String(json) );
            var t1 = performance.now();
            console.log("Call to function took= " + (t1 - t0) + " milliseconds.");
        }
    }
    render(){
        return (
        <div className="container">
            <h3>SpeedTest - index</h3>
            <div className="row">
                <div className="col-md-6">
                    <a id="download" href="" download="tasks.json" onClick={this.handleClickExport}
                     className="btn btn-outline-primary btn-sm">Export
                    </a> 
                    <Link to="/speed_test_test"
                     className="btn btn-sm btn-outline-primary ml-2">Add data
                    </Link>
                </div>
            </div><br />
            <hr />
            <div id="div_post_wrap">
                {this.tabRow()}
            </div>
        </div>
        )
    }
}

export default Index;

