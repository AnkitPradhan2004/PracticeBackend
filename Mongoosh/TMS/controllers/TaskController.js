const Task = require("../models/Task");


exports.createTask = async (req,res)=>{
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).json(task)
    } catch (error) {
        res.status(400).json({err: error.message})

        
    }
}

exports.getTasks = async (req,res)=>{
    try {
        const filter ={};
        if(req.query.status) filter.status = req.query.status;
        if(req.query.dueDate) filter.dueDate = {$lte: new Date(req.query.dueDate)};
        const tasks = await Task.find(filter);
        res.status(200).json(tasks)
        
    } catch (error) {
        res.status(500).json({error:error.message});

        
    }
}

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
