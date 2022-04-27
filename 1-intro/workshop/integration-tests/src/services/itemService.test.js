const { it } = require('@jest/globals');
const mongoose = require('mongoose');
const Item = require('../models/Item.js')
const { createItem, listItems, deleteAllItems} = require('./itemService.js');

mongoose.connect('mongodb://mongo:27017/docker-node-mongo-test', { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


test('post_item', async () => {
    const item = new Item({
        name: 'New Item'
    });
    let newItem = await createItem(item);
    const itemFind = await Item.findOne({ name: 'New Item' });

    expect(newItem.name).toBe(itemFind.name);
});

test('list_all_items', async () => { 
    const item = new Item({
        name: 'Item1'
    });
    const item2 = new Item({
        name: 'Item2'
    });
    const item3 = new Item({
        name: 'Item3'
    });
    await createItem(item);
    await createItem(item2);
    await createItem(item3);

    const items = await listItems();

    expect(items.length).toBe(4); // Nos 3 nouveaux items créés et 1 item déjà existant dans la bdd "New Item"
});

test('delete_all_items', async () => {
    await deleteAllItems();
    const items = await listItems();
    expect(items.length).toBe(0);  
});
test('error_cant_find_name', async () => {
    const item = new Item({

    });
    try {
        await createItem(item);
    } catch (err) {
        expect(err.message).toBe('No name provided in the body');
    }
}); 