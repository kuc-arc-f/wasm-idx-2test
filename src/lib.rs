mod utils;

use wasm_bindgen::prelude::*;
use web_sys::console;
use serde::{Deserialize, Serialize};
use serde_json::{Value};
use chrono::{Utc, Local, DateTime, Date};
use chrono::{NaiveDateTime, Duration};

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet() {
    alert("Hello, wasm-idx!");
}


#[wasm_bindgen]
pub fn add(x: i32, y: i32) ->i32{
    return x + y;
}

#[wasm_bindgen]
pub fn wasm_task_row(id_name: &str, json: &str) -> Result<(), JsValue>{
    let v: Value = serde_json::from_str( json ).unwrap();
    let tmp_title = v["title"].to_string();
    let title = tmp_title.replace('"', "");
    let id_val = v["id"].to_string();
    let tmp_date = v["created_at"].to_string();
    let date_val = tmp_date.replace('"', "");

    let document = web_sys::window().unwrap().document().unwrap();
    let entry_point = document.get_element_by_id(id_name).unwrap();
    let val = document.create_element("div")?;
    let s_elm = format!("
        <a href='#/task_show/{}'>
            <h3 class='h3_title'>{}</h3>
        </a>        
        <div class='div_post_date_wrap'>
            <p class='mb-0'>
                <span class='mr-2 time_icon_wrap'><i class='far fa-calendar'></i></span>
                {} ,
                <span>ID :{}</span>
                <a href='#/task_edit/{}' class='btn btn-sm btn-outline-primary ml-2'>
                Edit</a>
            </p>
        </div>
        <hr class='hr_ex1'>", id_val ,title, date_val, id_val, id_val );
    val.set_inner_html(&s_elm );
    entry_point.append_child(&val)?;

    Ok(())
}


#[derive(Serialize, Deserialize, Debug)]
struct TaskItem {
    id: i64,
    title: String,
    content: String,
    created_at: String,
}
//
fn convert_struct2str(row : &TaskItem) -> String{
    let mut ret : String = String::from("");
    let s_elm = format!("
    <div class='div_post_row_wrap'>
        <a href='#/task_show/{}'>
            <h3 class='h3_title'>{}</h3>
        </a>
        <div class='div_post_date_wrap'>
            <p class='mb-0'>
                <span class='mr-2 time_icon_wrap'><i class='far fa-calendar'></i></span>
                {} ,
                <span>ID :{}</span>
                <a href='#/task_edit/{}' class='btn btn-sm btn-outline-primary ml-2'>
                Edit</a>                
            </p>
        </div>
        <hr class='hr_ex1'>    
    </div>", row.id, row.title ,row.created_at ,row.id, row.id );
    ret = s_elm.to_string();
    return ret;
}


#[wasm_bindgen]
pub fn wasm_task_disp(id_name: &str, json: &str) -> Result<(), JsValue>{
    let mut s_elm : String = String::from("");
    let deserialized: Vec<TaskItem> = serde_json::from_str(json).unwrap();
    for row in &deserialized {
        let s = convert_struct2str( row);
        s_elm.push_str( &s );
//        console::log_1(&JsValue::from_str( &row.created_at ));
//        console::log_1(&JsValue::from_str( &s ));
    }
    // dom , add
    let document = web_sys::window().unwrap().document().unwrap();
    let entry_point = document.get_element_by_id(id_name).unwrap();
    let val = document.create_element("div")?;
    val.set_inner_html(&s_elm );
    entry_point.append_child(&val)?;

    Ok(())
}
//
fn convert_test(row : &TaskItem) -> String{
    let mut ret : String = String::from("");
    let s_elm = format!("
    <div class='div_post_row_wrap'>
        <p class='p_title mb-0'>{} {} ,<span>ID :{}</span>
        </p>
        <hr class='hr_ex1 mt-1 mb-1'>    
    </div>",  row.title ,row.created_at ,row.id);
    ret = s_elm.to_string();
    return ret;
}
#[wasm_bindgen]
pub fn wasm_test(id_name: &str, json: &str) -> Result<(), JsValue>{
    let mut s_elm : String = String::from("");
    let deserialized: Vec<TaskItem> = serde_json::from_str(json).unwrap();
    for row in &deserialized {
        let s = convert_test( row);
        s_elm.push_str( &s );
//        console::log_1(&JsValue::from_str( &row.created_at ));
//        console::log_1(&JsValue::from_str( &s ));
    }
    // dom , add
    let document = web_sys::window().unwrap().document().unwrap();
    let entry_point = document.get_element_by_id(id_name).unwrap();
    let val = document.create_element("div")?;
    val.set_inner_html(&s_elm );
    entry_point.append_child(&val)?;

    Ok(())
}

#[wasm_bindgen]
pub fn wasm_show_disp(id_name: &str, json: &str) -> Result<(), JsValue>{
    let v: Value = serde_json::from_str( json ).unwrap();
    let tmp_title = v["title"].to_string();
    let title = tmp_title.replace('"', "");
    let tmp_date = v["created_at"].to_string();
    let date_val = tmp_date.replace('"', "");
    let tmp_content = v["content"].to_string();
    let content_val = tmp_content.replace('"', "");
 //console::log_1(&JsValue::from_str( &id_name ));

    let document = web_sys::window().unwrap().document().unwrap();
    let entry_point = document.get_element_by_id(id_name).unwrap();
    let val = document.create_element("div")?;
    let s_elm = format!("
        <h1>{}</h1>
        Date : {}<hr>
        {} <br />
        <br />", title, date_val, content_val);
    val.set_inner_html(&s_elm );
    entry_point.append_child(&val)?;

    Ok(())
}

