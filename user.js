import { db } from "../db.js";

export const getUsers = (_, res) => {
    const q = "SELECT * FROM user";

    db.query(q, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    });
};

export const addUser = (req, res) => {
    const q = 
    "INSERT INTO user (`name`, `mail`, `age`, `birth_date`) VALUES(?)";

    const values = [
        req.body.name,
        req.body.mail,
        req.body.age,
        req.body.birth_date,
    ];

    db.query(q, [values], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("User created.");
    });
};

export const updateUser = (req, res) => {
    const q =
    "UPDATE user SET `name` = ?, `mail` = ?, `age` = ?, `birth_date` = ? WHERE `id` = ?";

    const values= [
        req.body.name,
        req.body.mail,
        req.body.age,
        req.body.birth_date,
    ];

    db.query(q, [...values, req.params.id], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("User updated.");
    });
};

    export const deleteUser = (req, res) => {
        const q = "DELETE FROM user WHERE `id` = ?";
      
        db.query(q, [req.params.id], (err) => {
          if (err) return res.json(err);
      
          return res.status(200).json("User deleted.");
        });
};