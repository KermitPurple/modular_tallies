const tally_grid = document.querySelector('#tally-grid');
const new_button = document.querySelector('.new-button');

function make_tally(name, count){
    if(typeof(this.count) === 'undefined')
        this.count = 0;
    this.count++;
    if(typeof(this.element) === 'undefined')
        this.element = document.querySelector('#tally-template').content.firstElementChild;
    let result = this.element.cloneNode(true);
    if(typeof(name) === 'undefined')
        result.querySelector('input').value += this.count.toString();
    else
        result.querySelector('input').value = name;
    if(typeof(count) !== 'undefined')
        result.querySelector('.tally-counter').innerHTML =  count;
    return result;
}

function add_tally(name, count){
    tally_grid.insertBefore(make_tally(name, count), new_button)
    save_to_cookies()
}

function delete_tally(node){
    tally_grid.removeChild(node);
    save_to_cookies()
}

function set_cookie(key, value){
    document.cookie = key + '=' + value;
}

function get_cookie(key){
    let rows = document.cookie.split('; ');
    for(let i = 0; i < rows.length; i++)
        if(rows[i].startsWith(key))
            return rows[i].split('=')[1];
    return null;
}

function increment_innerHTML(node){
    node.innerHTML = (parseInt(node.innerHTML) + 1).toString();
    save_to_cookies()
}

function save_to_cookies(){
    list = [];
    let tallies = tally_grid.querySelectorAll('.tally');
    for(tally of tallies)
        list.push({
            name: tally.querySelector('.tally-name').value,
            count: tally.querySelector('.tally-counter').innerHTML,
        });
    set_cookie('json', JSON.stringify(list));
}

function load_from_json(json){
    let list = JSON.parse(json);
    for(let item of list){
        add_tally(item.name, item.count);
        console.log(item);
    }
}

let json = get_cookie('json')
if(json == null)
    add_tally();
else
    load_from_json(json);
