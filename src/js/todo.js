import $ from 'jquery';
import _ from 'lodash';

/**
 * Component for keeping track of TODO items
 */
class ToDoList {
  
  /**
   * Create the component
   * @param {number} renderElement Element to render the ToDoList in (DOM object ID)
   */
  constructor(renderElement) {
    this.renderElement = renderElement;
    // List for the todo items
    this.items = [];
    $.getJSON('http://localhost:3000/api/todo',function(data){
         var i=0;
         for(i=0;i<data.length;i++){
            this.items[i]=data[i];
        }
    });
  }

  /**
   * Adds an item to the ToDoList
   * @param {String} item  Item to add
   */
  addItem(item) {
    if(this.contains(item)){
      alert("Todo item already exists!");
    }else{
      $.post("http://localhost:3000/api/todo/" + item);
    }
    // Re-render
    this.render();
  }

  /**
   * Check if an item is already in the todolist
   * @param {String} item Item to check for
   * @return {Boolean} True, if the item exists
   */
  contains(item) {
    return _.includes(this.items, item);
  }

  /**
   * Render the element in the DOM
   */
  render() {
    // Find parent element and construct the HTML
    let parent = $('#'+this.renderElement);
    $(parent).html('');
    let result = "";
    for (let i = 0; i < this.items.length; i++) {
      result += `<li>
        <span>${this.items[i]}</span>
        <a href="#" data-index="${i}"><i class="delete"></i></a>
      </li>`;
    }  
    // Add to the DOM
    $(parent).html(result);

    // We need to access stuff from this-object in the callback!
    // Therefore store a referene to the this object
    let classReference = this;

    // Add click action to the delete button
    $('#' + this.renderElement + ' i.delete').unbind('click');
    $('#' + this.renderElement + ' i.delete').click(function(e) {
      e.preventDefault();
      classReference.delete($(this).parent().parent().find('span').html());
    });
  }

  /**
   * Deletes an element from the ToDoList
   * @param item {String} Element to remove from the ToDoList
   */
  delete(item) {
    $.ajax({
        url: 'http://localhost:3000/api/todo/' + item,
        type: 'DELETE',
        success: function(result) {
            console.log(item + " is deleted!");
        }
    });

    // Re-render
    this.render();
  }
}

export {ToDoList};
