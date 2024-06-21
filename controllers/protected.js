const protected= (req,res)=>{
  res.json({message: 'This is a protected route, uses middleware to verify token'});
}
module.exports=protected