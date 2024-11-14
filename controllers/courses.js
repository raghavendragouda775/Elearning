import TryCatch from "../middleware/TryCatch.js";
import { Courses } from "../models/courses.js";
import { Lecture } from "../models/Lectures.js";
import User from "../models/User.js";

export const getAllCourses=TryCatch(async(req,res)=>{
  const courses=await Courses.find();
  res.json({
    courses
  })
});
export const getSingleCourse=TryCatch(async(req,res)=>{
    const course=await Courses.findById(req.params.id)
    res.json({
        course
    })
})
export const fetchLectures=TryCatch(async(req,res)=>{
    const lectures=await Lecture.find({course:req.params.id});
    const user=await User.findById(req.user._id);
    if(user.role==="admin")
    {
        return res.json({lectures})
    }
    // wheather user have taken subscription or not?
    if(!user.subscription.includes(req.params.id))
        return res.status(400).json({
    message:"You have not Subcribed to this course"})
    // if yes send lectures to him
    res.json({lectures});
})
export const fetchLecture=TryCatch(async(req,res)=>{
    const lecture=await Lecture.findById(req.params.id);
    const user=await User.findById(req.user._id);
    if(user.role==="admin")
    {
        return res.json({lecture})
    }
    // wheather user have taken subscription or not?
    if(!user.subscription.includes(lecture.course))
        return res.status(400).json({
    message:"You have not Subcribed to this course"})
    // if yes send lectures to him
    res.json({lecture});
})
export const getMyCourses=TryCatch(async(req,res)=>{
    // fetching all the course with id and the id is which is present in the usern subscription 
    const courses=await Courses.find({_id:req.user.subscription})
    res.json({
        courses,
    })
})