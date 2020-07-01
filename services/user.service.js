import {config} from '../config/config'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import {User} from '../models/db'

module.exports = {
    authenticate,
    getAll,
    getById,
    getByEmail,
    getByUsername,
    create,
    update,
    delete: _delete
};

async function authenticate({username, password}) {
    const user = await User.findOne({username});
    if (user && bcrypt.compareSync(password, user.hash)) {
        const token = jwt.sign({sub: user.id}, config.secret);
        return {
            ...user.toJSON(),
            token
        };
    }
}

async function getAll() {
    return await User.find();
}

async function getById(id) {
    return await User.findById(id);
}

async function getByEmail(value) {
    const users = await User.find({"email": value});
    return users[0];
}

async function getByUsername(value) {
    const users = await User.find({"username": value});
    return users[0];
}

async function create(userParam) {
    // validate
    if (await User.findOne({username: userParam.username})) {
        throw 'Username "' + userParam.username + '" is already taken';
    }
    if (userParam.email === undefined) {
        throw 'Email must be defined!'
    } else if (await User.findOne({email: userParam.email})) {
        throw 'Email "' + userParam.email + '" is already used by another user';
    }

    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    let r = undefined;
    await user.save().then((new_user) => {
        const token = jwt.sign({sub: new_user.id}, config.secret);
        r = {
            ...new_user.toJSON(),
            token
        };

    });
    return r;
}

async function update(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.username !== userParam.username && await User.findOne({username: userParam.username})) {
        throw 'Username "' + userParam.username + '" is already taken';
    }
    if (user.email !== userParam.email && await User.findOne({email: userParam.email})) {
        throw 'Email "' + userParam.email + '" is already used by another user';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}
