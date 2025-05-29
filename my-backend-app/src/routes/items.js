import express from 'express';


const router = express.Router();


let items = [
    { id: 1, name: 'Item 1', description: 'Description for Item 1' },
    { id: 2, name: 'Item 2', description: 'Description for Item 2' },
    { id: 3, name: 'Item 3', description: 'Description for Item 3' },
]

// get all items
router.get("/", (req, res) => {
    res.json(items);
})

// get item by id
router.get("/:id", (req, res)=> {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).send('Item not found');
    res.json(item);
})

// create new item
router.post("/", (req, res) => {
    const {name, description} = req.body;
    const newItem = {
        id: items.length + 1,
        name,
        description
    }
    items.push(newItem);
    res.status(201).json(newItem);
})

// update item
router.put("/:id", (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).send('Item not found');

    const {name, description} = req.body;
    item.name = name;
    item.description = description;

    res.json(item);
})


// delete item
router.delete("/:id", (req, res) => {
    items = items.filter(i => i.id !== parseInt(req.params.id));
    res.json({
        message: 'Item deleted successfully',
        code: 200
    });
})

export default router;