
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Dexie from 'dexie';
import LibTask from '../../libs/LibTask';
import LibCommon from '../../libs/LibCommon';
import * as wasm from "wasm-idx";

//
class Show extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            type :0 , 
            created_at: '',
            item : null,
        };
        this.id = 0
        this.handleClick = this.handleClick.bind(this);
        this.db = null
    }
    componentDidMount(){
        this.id  = parseInt(this.props.match.params.id)
        var config = LibTask.get_const()
        this.db = new Dexie( config.DB_NAME );
        this.db.version(config.DB_VERSION).stores( config.DB_STORE );         
//console.log( this.id);
        this.get_item( this.id )
    }
    async get_item(id){
        var item = await this.db.tasks.get(id);
        item.created_at = LibCommon.formatDate(item.created_at, 'YYYY-MM-DD hh:mm')
        this.setState({ 
            title: item.title, 
            content: item.content,
            type: item.complete,
            created_at: item.created_at,
            item: item,
        });        
//        console.log(item);
    }
    handleClick(){
        console.log("#-handleClick")
//        console.log( this.state )
    }
    dispShow(){
        if(this.state.item != null){
            var json = JSON.stringify( this.state.item );
//            console.log( json )
            wasm.wasm_show_disp("div_show_wrap", String(json) );                          
        }
    }        
    render(){
        $("#div_show_wrap").empty();
        return (
        <div className="container">
            <Link to="/task" className="btn btn-outline-primary mt-2">Back</Link>
            <hr className="mt-2 mb-2" />            
            <div id="div_show_wrap">
                {this.dispShow()}
            </div>
        </div>
        )
    }
}
export default Show;