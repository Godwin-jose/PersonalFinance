const express = require('express')
const bcrypt = require('bcrypt');
require('./connection')
const usersdata=require('./models/users.model');
const Budget=require('./models/dashboard.model');
const cors = require('cors');



const app = express()
app.use(cors());



app.use(express.json());                           //Middleware




app.get('/users',async(req,res)=>{
    try {
        const data= await usersdata.find();      //getting all the details of users loggedin the database
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        
    }})



    //signing up
    
    app.post('/signup', async (req, res) => {
        try {
          const { userName, password,email } = req.body;
      
          // Check if the user already exists
          const existingUser = await usersdata.findOne({ userName });
          if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
          }
      
          // Hash the password
          const hashedPassword = await bcrypt.hash(password, 10);
      
          // Create a new user with the hashed password
          const newUser = new usersdata({
            userName,
            email,
            password: hashedPassword,
          });
      
          // Save the new user to the database
          await newUser.save();
          res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
          console.log(error);
          res.status(500).json({ message: 'Server error' });
        }
      });

  //Loging In

app.post('/login', async (req, res) => {
    const { userName, password } = req.body;
    
  
    try {
      if(userName =='admin' && password=='admin'){

        return res.status(201).json({ message: '1' });
        
  
      }
      // Find user by username
      const user = await usersdata.findOne({ userName });
      const Data = await Budget.find({ userName });

  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Compare provided password with stored hashed password
      const isMatch = await bcrypt.compare(password, user.password);
     
  
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      
  
      // res.status(200).json({ message: 'Login successful' });
      res.status(200).json(Data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });


  app.post('/admin/login', async (req, res) => {
    const {userName} = req.body;
  
    try {
      // Find user by username
      const user = await usersdata.findOne({ userName });
      const Data = await Budget.find({ userName });

  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Compare provided password with stored hashed password
      const isMatch = true;
     
  
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // res.status(200).json({ message: 'Login successful' });
      res.status(200).json(Data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });







//DASHBOARD
app.get('/profile',async(req,res)=>{
  try {
    
  const data=await Budget.find();             //datas of a user in a a dashboard 
  res.status(200).json(data);
      
  } catch (error) {
      console.log(error)
  }
})

app.post('/profile',async(req,res)=>{               //dashboard database post
       try {
        console.log(req.body);
        await Budget(req.body).save();
        res.status(201).json('Budget added to Database')
        
       } catch (error) {
        console.log(error)
       }
})


app.delete('/profile/:id',async(req,res)=>{        //Delete a data of  user from database dashboard 
    try {
        const {id}=req.params;
        await Budget.findByIdAndDelete(id);
        res.status(200).json("Data Deleted")
        
    } catch (error) {
        console.log(error)
    }
})

app.delete('/profile/user/:id',async(req,res)=>{        //Delete  user from database dashboard 
  try {
      const {id}=req.params;
      await usersdata.findByIdAndDelete(id);
      res.status(200).json("Data Deleted")
      
  } catch (error) {
      console.log(error)
  }
})


app.put('/profile/:id',async(req,res)=>{           //update data of user in dashboard
    try {
    const {id}=req.params;
    const Data = await Budget.find({ id });
    await Budget.findByIdAndUpdate(id,req.body);
    res.status(200).json(Data)
    res.status(200).json('Data Updated Successfully')
        
    } catch (error) {
        console.log(error)
    }

})

app.get('/profile/:id',async(req,res)=>{           //update data of user in dashboard
  try {
  const {id}=req.params;
  const Data = await Budget.find({_id:id});
 
  res.status(200).json(Data)
 
      
  } catch (error) {
      console.log(error)
  }

})




//Admin

// app.post('/admin', async (req, res) => {
//   const { userName, password } = req.body;

//   try {
//     // Find user by username
//     if(userName =='admin' && password=='admin'){

//       res.status(200).json({ message: 'Login successful' });
      

//     }else{
//       res.status(404).json("User Not Found")
//     }



   
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });



app.get('/admin/users',async(req,res)=>{
try {
  const data=await usersdata.find();
  res.status(200).json(data);

} catch (error) {
  console.log(error);
}
})




//listen
app.listen(3000,()=>{
    try {
        console.log("Listening on port 3000");
        
    } catch (err) {
        console.log(err)
    }
})