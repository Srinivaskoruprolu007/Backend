const fs = require('fs');


const users = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/users.json`)
)


const getAllUsers = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: users.length,
        data: {
            users
        }
    })
}

const getUserById = (req, res) => {
    const id = req.params.id;
    const user = users.find(u => u._id === id)
    console.log(user);
    if(user){
        res.status(200).json({
            status:"success",
            data:{
                user
            }
        })
        return;
    }
    res.status(404).json({
        status:404,
        message:"user is not found"
    })
}

const addNewUser = (req, res) => {
    const newId = (Math.random() + 1).toString(36).substring(2, 10);
    const newUser = Object.assign({ _id: newId }, req.body);

    users.push(newUser);
    fs.writeFile(`${__dirname}/dev-data/data/users.json`, JSON.stringify(users), err => {
        res.status(201).json({
            status: 201,
            data: {
                user: newUser
            }
        });
    });
}

const updateUser = (req, res) => {
    const id = req.params.id * 1;
    const user = users.find(u => u.id === id);

    if (user) {
        const updatedUser = Object.assign(user, req.body);
        fs.writeFile(`${__dirname}/dev-data/data/users.json`, JSON.stringify(users), err => {
            res.status(200).json({
                status: 200,
                data: {
                    user: updatedUser
                }
            });
        });
        return;
    }
    res.status(404).json({
        status: 400,
        message: "User is not found"
    });
}
const deleteUser = (req, res) => {
    const id = req.params.id;
    const userIndex = users.findIndex(u => u.id === id);

    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        fs.writeFile(`${__dirname}/dev-data/data/users.json`, JSON.stringify(users), err => {
            res.status(204).json({
                status: 204,
                data: null
            });
        });
        return;
    }

    res.status(404).json({
        status: 400,
        message: "User is not found"
    });
}

module.exports = {
    getAllUsers,
    getUserById,
    addNewUser,
    updateUser,
    deleteUser
}