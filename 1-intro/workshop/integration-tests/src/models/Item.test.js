const mongoose = require('mongoose');
const Item = require('./Item.js');
const { it } = require('@jest/globals');

mongoose.connect('mongodb://mongo:27017/docker-node-mongo-test', { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


it('post_item', async () => {
    const item = new Item({
        name: 'New Item'
    });
    await item.save();
    expect(item.name).toBe('New Item');
})
it('get_item', async () => {
    const item = await Item.findOne({ name: 'New Item' });
    expect(item.name).toBe('New Item');
})
it('get_all_items', async () => {
    const item1 = new Item({
        name: 'My Item1'
    });
    const item2 = new Item({
        name: 'My Item3'
    });
    const item3 = new Item({
        name: 'My Item2'
    });
    await item1.save();
    await item2.save();
    await item3.save();

    const items = await Item.find({});
    expect(items.length).toBe(4); // Nos 3 nouveaux items créés et 1 item déjà existant dans la bdd "New Item"
});
it('put_item', async () => {
    const item = await Item.findOne({ name: 'New Item' });
    item.name = 'Updated Item';
    await item.save();
    const updatedItem = await Item.findOne({ name: 'Updated Item' });
    expect(updatedItem.name).toBe('Updated Item');
})
it('delete_item', async () => {
    await Item.deleteOne({ name: 'Updated Item' });
    const item = await Item.findOne({ name: 'Updated Item' });
    expect(item).toBe(null);
})
it('delete_all_items', async () => {
    await Item.deleteMany({});
    const items = await Item.find({});
    expect(items.length).toBe(0);
})
