import express from 'express';

const router = express.Router();

// Sets cookie to null to signout user
router.post('/api/users/signout',(req, res) => {
    req.session = null;

    res.send({});
});

export { router as signoutRouter };