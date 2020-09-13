import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Dexie from 'dexie';
import LibTask from '../../libs/LibTask';
import LibDexie from '../../libs/LibDexie';

//
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {data: ''}
        this.db = null
    }
    componentDidMount(){
        var config = LibTask.get_const()
// console.log(config)
        this.db = new Dexie( config.DB_NAME );
        this.db.version(config.DB_VERSION).stores( config.DB_STORE );
        this.get_items()        
    }
    async get_items(){
        var self = this
        await this.db.tasks.toArray().then(function (items ) {
            var tasks = LibDexie.get_reverse_items(items)
            self.setState({ data: tasks })
//console.log( tasks )
        });
        this.dispDom()
    }
    getPostRow(item){
        var ret = "<div class='div_post_row_wrap'>";
        ret += "  <p class='p_title mb-0'>";
        ret += item.title;
        ret += " , "+ item.created_at + " ,";
        ret += "<span>ID :" + item.id + "</span>";
        ret += "  </p>";
        ret += "  <hr class='hr_ex1 mt-1 mb-1'>";
        ret += "</div>";
        return ret;
    }    
    dispDom(){
        if(this.state.data instanceof Array){
            var t0 = performance.now();
            var s_elm = "";     
            var self = this
            this.state.data.map(function(object, i){
                var s = self.getPostRow( object );
                s_elm += s;
            })            
// console.log( s_elm )
            var parent = window.document.getElementById('div_post_wrap');
            var div = document.createElement('div');
            div.innerHTML = s_elm;
            parent.appendChild(div);
            var t1 = performance.now();
            console.log("Call to function took= " + (t1 - t0) + " milliseconds.");
        }
    }    
    render(){
        return (
        <div className="container">
            <h3>SpeedTest-javascript - index</h3>
            <div className="row">
                <div className="col-md-6">
                    <a id="download" href="" download="tasks.json" onClick={this.handleClickExport}
                     className="btn btn-outline-primary btn-sm">Export
                    </a> 
                </div>
            </div><br />
            <hr />
            <div id="div_post_wrap">
            </div>
        </div>
        )
    }
}

export default Index;

